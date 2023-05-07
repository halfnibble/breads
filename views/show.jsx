const React = require("react");
const Default = require("./layouts/default");

const Show = ({ bread }) => {
    // console.log(bread.name);
    return (
        <Default>
            <h2>Bread Show Page</h2>
            <h3>{bread.name} bread</h3>
            <p>
                and it
                {bread.hasGluten ? <span> does </span> : <span> does NOT </span>}
                have gluten.
            </p>
            <img width="480" src={bread.image} alt={bread.name} />
            <p>{bread.getBakedBy()}</p>
            <li>
                <a href="/breads">Go home</a>
            </li>
            <a href={`/breads/${bread.id}/edit`}>
                <button>Edit</button>
            </a>
            <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE" />
            </form>
        </Default>
    );
};

module.exports = Show;
