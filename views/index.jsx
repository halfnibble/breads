const React = require("react");
const Default = require("./layouts/default");

// JSX Component
const Index = ({ breads, title }) => {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
            <div className="newButton">
                <a className="button" href="/breads/new">
                    Add a new bread
                </a>
            </div>
            <ul>
                {breads.map((bread) => (
                    <li key={bread.id}>
                        <a href={`/breads/${bread.id}`}>{bread.name}</a>
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
