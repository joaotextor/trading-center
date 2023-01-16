const classes = {
    container: {
        marginBottom: 5,
    },

    box: {
        backgroundColor: "white",
        padding: 3,
    },

    formControl: {
        marginBottom: 2,
    },

    inputLabel: {
        fontWeight: 400,
        marginLeft: -1.5,
    },

    submit: {
        marginTop: 2,
    },

    loading: {
        display: "block",
        margin: '10px auto' 
    },

    errorMessage: {
        marginBlock: '0 20px'
    },

    orSeparator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        width: '100%',
        height: '1px',
        margin: '7 0 4',

        '& span': {
            backgroundColor: 'white',
            padding: '0 30px'
        }
    },
}

export { classes }