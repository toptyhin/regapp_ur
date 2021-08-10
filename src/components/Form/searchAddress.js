import React from 'react'
import { Search } from 'semantic-ui-react'
import AppContext from './appContext';


const initialState = {
    loading: false,
    results: [],
    value: '',
    text: 'Укажите адрес доставки',
    errorText: 'Уточните адрес',
    error: false
  };
const token = 'a677c0dcff5cd2767c0aa85a6793f5430a3be34a';
const xhr = new XMLHttpRequest();

  function searchReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query, error: false }
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results, error: false }
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection, selected: action.selected, error: false }
      case 'VERIFY_SEARCH':
        return { ...initialState, error: true }        
  
      default:
        throw new Error()
    }
  }
  
  const SearchAddress = (props) => {
    const [state, dispatch] = React.useReducer(searchReducer, initialState)
    const { loading, results, value, selected, error, text, errorText } = state;
    const {stateCont, setAddress} = React.useContext(AppContext)
  
    const timeoutRef = React.useRef()

    const handleSearchChange = React.useCallback((e, data) => {
      clearTimeout(timeoutRef.current)
      dispatch({ type: 'START_SEARCH', query: data.value })
  
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' })
          return
        }
        let payload = {
            query: data.value,
            count: 10,
          };
        xhr.abort();
        xhr.open('POST', `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Authorization', `Token ${token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(payload));        
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
              return;
            }
      
            if (xhr.status === 200) {
              const { suggestions } = JSON.parse(xhr.response);
              let vals = [];
              suggestions.map(i=>{vals.push(
                  {
                    title: i.unrestricted_value,
                    region: i.data.region,
                    postcode: i.data.postal_code,
                    address: i.value.replace(i.data.region_with_type+',','').trim()

                  }
                )})
              
      
              if (suggestions && suggestions.length) {
                dispatch({
                    type: 'FINISH_SEARCH',
                    results: vals,
                  })
              }
            }
          };        
      }, 300)
    }, [])
    
    React.useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current)
      }
    }, [])
  
    return (
        <div className="field">
            <label>{error ? errorText:text}</label>
              <Search
                fluid
                name='address'
                className={error?'error':''}
                loading={loading}
                onResultSelect={(e, data) => {
                      // props.setSelected(e,{
                      //     name:'address',
                      //     value: data.result
                      // });
                      setAddress(data.result);

                      return dispatch({ type: 'UPDATE_SELECTION', selection: data.result.unrestricted_value, selected: data.result })
                  }
                }
                onSearchChange={handleSearchChange}
                minCharacters={3}
                results={results}
                noResultsMessage='Адрес не найден'
                value={value}
                onBlur={()=>{
                  if (!selected || !selected.postcode) {
                    setAddress({});
                    dispatch({ type: 'VERIFY_SEARCH' })
                    return;
                  }
                }}
              />
        </div>
    )
  }
  
  export default SearchAddress