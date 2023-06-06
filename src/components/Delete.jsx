const Delete = (props) => {

    console.log(props);
    const {onDelete, id} = props;
    return (
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  };

export default Delete;
