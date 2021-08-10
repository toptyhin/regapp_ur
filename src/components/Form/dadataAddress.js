import React, {Component} from 'react'

const defaultEndpoint = {
    api: 'suggestions/api/4_1/rs/suggest',
    host: 'https://suggestions.dadata.ru',
  };

  const backslashTailFix = (uriPart) => (uriPart.endsWith('/') ? uriPart.slice(0, -1) : uriPart);

  const buildTargetURI = (customEndpoint) => {
    if (typeof customEndpoint === 'string') {
      if (/^http[s]?:/g.test(customEndpoint) || customEndpoint.startsWith('/')) {
        // Full path of host (API placed automatically - back compatibility to v1.2.8 and later)
        return backslashTailFix(`${customEndpoint}/${defaultEndpoint.api}`);
      }
    } else if (customEndpoint instanceof Object) {
      // Customize by object
      const endpointObject = { ...defaultEndpoint, ...customEndpoint };
      return `${backslashTailFix(endpointObject.host)}/${backslashTailFix(endpointObject.api)}`;
    }
  
    // Default
    return backslashTailFix(`${defaultEndpoint.host}/${defaultEndpoint.api}`);
  };

const fakeRandomKey = () => Math.random().toString(16).slice(2);
const SuggestionsList = ({
    onSuggestionClick,
    query,
    showNote = true,
    suggestionIndex,
    suggestions,
    type,
  }) => {
    return (
      !!(suggestions.length) && (
        <div>
          {suggestions.map(({ value, data }, index) => (
            <div
              key={fakeRandomKey()}
              onMouseDown={() => {
                onSuggestionClick(index);
              }}
            >
                {value}
            </div>
          ))}
        </div>
      )
    );
  };


export default class DadataAddress extends Component {
    state = {
        inputFocused: false,
        isValid: false,
        query: this.props.query || '',
        showSuggestions: true,
        suggestionIndex: 0,
        suggestions: [],
        type: 'address',
      };
    
      static displayName = 'ReactDaDataBox';
    
      xhr = new XMLHttpRequest();
      debounceTimer;
      
      componentDidMount = () => {
        if (this.props.query || this.props.silentQuery) {
          this.fetchSuggestions(null, () => {
            if (this.props.silentInit) {
              const forceSelect = this.props.silentInit(this.state.suggestions);
              if (
                forceSelect !== undefined &&
                typeof forceSelect === 'number' &&
                forceSelect < this.state.suggestions.length
              ) {
                this.selectSuggestion(forceSelect);
              }
            }
          });
        }
      };
    
      componentDidUpdate = (prevProps) => {
        if (this.props.query !== prevProps.query) {
          this.setState({ query: this.props.query }, this.fetchSuggestions);
        }
      };
    
      componentWillUnmount() {
        // Cancel all subscriptions and asynchronous tasks
        clearTimeout(this.debounceTimer);
        this.xhr.abort();
      }

      onInputBlur = () => {
        this.setState({ inputFocused: false });
      };      

      onInputFocus = () => {
        if (!this.state.value && this.props.silentQuery) {
          this.fetchSuggestions({ inputFocused: true, showSuggestions: true });
        } else {
          this.setState({ inputFocused: true });
        }
      };
      
      debounce = (func, cooldown = 350) => {
        return (...args) => {
          if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
          }
          this.debounceTimer = setTimeout(() => {
            func(...args);
          }, cooldown);
        };
      };
    
      onInputChange = (event) => {
        const { value } = event.target;
    
        this.setState({ query: value, showSuggestions: true }, () => {
          this.debounce(this.fetchSuggestions, this.props.debounce)({ inputFocused: true, showSuggestions: true });
        });
    
        !value && this.clear();
      };
    
      onKeyPress = (event) => {
        const { suggestionIndex, suggestions } = this.state;
    
        if (event.which === 40 && suggestionIndex < suggestions.length - 1) {
          // Arrow down
          this.setState((prevState) => ({ suggestionIndex: prevState.suggestionIndex + 1 }));
        } else if (event.which === 38 && suggestionIndex > 0) {
          // Arrow up
          this.setState((prevState) => ({ suggestionIndex: prevState.suggestionIndex - 1 }));
        } else if (event.which === 39 && suggestionIndex >= 0) {
          // Arrow right
          this.selectSuggestion(this.state.suggestionIndex, true);
        } else if (event.which === 13 && suggestionIndex >= 0) {
          // Enter
          event.preventDefault();
          event.stopPropagation();
          this.selectSuggestion(this.state.suggestionIndex);
        }
      };      
      fetchSuggestions = (setStateAdditional = {}, callback) => {
        this.xhr.abort();
    
        const { type } = this.state;
        const { city, customEndpoint } = this.props;
    
        let payload = {
          query: this.state.query || this.props.silentQuery,
          count: this.props.count || 10,
        };
    
        if (city && type === 'address') {
          payload.from_bound = { value: 'city' };
          payload.to_bound = { value: 'settlement' };
          payload.value = 'settlement';
        }
    
        if (this.props.payloadModifier) {
          payload =
            this.props.payloadModifier instanceof Function
              ? this.props.payloadModifier(payload)
              : this.props.payloadModifier instanceof Object
              ? Object.assign(payload, this.props.payloadModifier)
              : payload;
        }
    
        this.xhr.open('POST', `${backslashTailFix(buildTargetURI(customEndpoint))}/${type}`);
        this.xhr.setRequestHeader('Accept', 'application/json');
        this.xhr.setRequestHeader('Authorization', `Token ${this.props.token}`);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.send(JSON.stringify(payload));
    
        this.xhr.onreadystatechange = () => {
          if (this.xhr.readyState !== 4) {
            return;
          }
    
          if (this.xhr.status === 200) {
            const { suggestions } = JSON.parse(this.xhr.response);
            const stateAdditions = setStateAdditional || {};
    
            if (suggestions && suggestions.length) {
              this.setState(
                {
                  ...stateAdditions,
                  ...{
                    suggestions,
                    suggestionIndex: 0,
                    showSuggestions:
                      this.state.inputFocused || stateAdditions.inputFocused
                        ? Boolean(stateAdditions.showSuggestions)
                        : false,
                  },
                },
                callback
              );
            } else if (this.props.onIdleOut) {
              this.props.onIdleOut(this.state.query);
            }
          }
        };
      };    
      
      onSuggestionClick = (index) => {
        if (this.state.suggestions[index]) {
          this.selectSuggestion(index);
        }
      };

      selectSuggestion = (index, showSuggestions = false) => {
        const { suggestions } = this.state;
        const { value } = suggestions[index];
    
        this.setState({
          query: value,
          showSuggestions: showSuggestions,
        });
    
        if (this.props.onChange) {
          this.props.onChange(suggestions[index]);
        }
      };
    
      muteEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      render() {
        const { inputFocused, query, showSuggestions, suggestionIndex, suggestions, type } = this.state;
        const {
          allowClear,
          autocomplete,
          className,
          forceOpenList,
          placeholder,
          showNote,
          style,
        } = this.props;
    
        const showSuggestionsList = inputFocused && showSuggestions;
    
        const inputConfig = {
          autoComplete: (autocomplete === 'on' && autocomplete) || 'off',
          className: `react-dadata__input${allowClear ? ' react-dadata__input-clearable' : ''}`,
          onBlur: this.onInputBlur,
          onChange: this.onInputChange,
          onFocus: this.onInputFocus,
          onKeyDown: this.onKeyPress,
          placeholder: placeholder,
          value: query,
        };
        return (
          <div className={`react-dadata react-dadata__container ${className}`} style={style}>
            {this.customInput(inputConfig)}

            {(showSuggestionsList || forceOpenList) && (
              <SuggestionsList
                suggestions={suggestions}
                suggestionIndex={suggestionIndex}
                query={query}
                type={type}
                showNote={showNote}
                onSuggestionClick={this.onSuggestionClick}
              />
            )}
          </div>
        );
      }      

      customInput(params) {
        return (<input {...params} />);
      }

}