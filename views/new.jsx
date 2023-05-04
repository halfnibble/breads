const React = require("react");
const Default = require("./layouts/default");

const New = ({ title }) => {
    return (
        <Default title={title}>
            <h2>Add a new bread</h2>
            <form action="/breads" method="POST">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" id="image" />

                <label>
                    <input type="checkbox" name="hasGluten" id="hasGluten" defaultChecked />
                    &nbsp; Has Gluten?
                </label>

                <br />

                <input type="submit" />
            </form>
        </Default>
    );
};

module.exports = New;
