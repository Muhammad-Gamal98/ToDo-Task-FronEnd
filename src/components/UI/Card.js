import React from "react";

function Card(props) {
  return (
    <section className={`card ${props.classes} p-3`}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        {props.children}
      </div>
    </section>
  );
}

export default Card;
