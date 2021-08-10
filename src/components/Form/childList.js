function ChildList(props) {
    return (<div className="list">{props.children()}</div>);
}
export default ChildList