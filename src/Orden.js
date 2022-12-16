function Orden(props) {
    const { ordenes }  = props;

    return (
        <>
            <h1>Ordenes List</h1>
            <table border="1">
                <tr>
                    <td>id</td>
                    <td>montoTotal</td>
                </tr>
                {
                    ordenes.map(p=> <>
                        <tr>
                            <td>{p.id}</td>
                            <td>{p.montoTotal}</td>
                        </tr>
                    </>)
                }
        </table>
        </>
    );
}

export default Orden;