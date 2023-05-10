const React = require("react");
const Default = require("./layouts/default");

// JSX Component
const Index = ({ breads, bakers, title }) => {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
            <h3>Bakers</h3>
            <ul>
                {bakers.map((baker) => {
                    return (
                        <li key={baker._id}>
                            <a href={`/bakers/${baker._id}`}>{baker.name}</a>
                        </li>
                    );
                })}
            </ul>

            <h3>Breads</h3>
            <div className="newButton">
                <a className="button" href="/breads/new">
                    Add a new bread
                </a>
            </div>
            <ul>
                {breads.map((bread) => (
                    <li key={bread._id}>
                        <a href={`/breads/${bread._id}`}>{bread.name}</a>
                    </li>
                ))}
                {/* 
                    <li>Rye</li>
                    <li>Wheat</li>
                    <li>...</li>
                */}
            </ul>
        </Default>
    );
};

module.exports = Index;
