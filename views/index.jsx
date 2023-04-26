const React = require("react");
const Default = require("./layouts/default");

// JSX Component
const Index = ({ breads }) => {
    return (
        <Default>
            <h2>Index Page</h2>
            <div className="newButton">
                <a className="button" href="/breads/new">
                    Add a new bread
                </a>
            </div>
            <ul>
                {breads.map((bread, index) => (
                    <li key={index}>
                        <a href={`/breads/${index}`}>{bread.name}</a>
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
