import Character from "./Character";

const Simpsons = (props) => {
    const { simpsons, onDelete, onLikeToggle, onAlphaSort } = props;

    return (
      <>
        {simpsons.map((item, index) => {
          return <Character 
          item={item} 
          key={item.id} 
          onLikeToggle={props.onLikeToggle}
          onDelete={props.onDelete}
          onAlphaSort={props.onAlphaSort}
          />;
        })}
      </>
    );
  };

export default Simpsons;
