const React = require("react");
const Default = require("./layouts/default");

// JSX Component
const Index = ({ breads }) => {
    return (
        <Default>
            <h2>Index Page</h2>
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
