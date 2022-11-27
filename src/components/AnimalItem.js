export default function AnimalItem(props) {

    const handleChange = () => {
        props.setStateOfParent(props.info["name"], props.info["lifespan"]);
    };
    
	return (
		<div className="animal-item">
            <h3>{props.info["name"]}</h3>
            <img src={props.info["image_link"]}></img>
            <p>Animal Type: {props.info["animal_type"]}</p>
            <p>Geo Range: {props.info["geo_range"]}</p>
            <p>Active Time: {props.info["active_time"]}</p>
            <p>Diet: {props.info["diet"]}</p>
            <p>Lifespan: {props.info["lifespan"]}</p>
            <button onClick={() => handleChange()}>{props.liked === 1 ? "Unlike" : "Like"}</button>
        </div>
	);
}