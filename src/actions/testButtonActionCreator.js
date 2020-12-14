const testButtonActionCreator = (msg) => {
    console.log(">>> >>> >>> >>> >>> TestButtonActionCreator. Message = ", msg)
    return {
        type: 'TEST-BUTTON-CLICKED',
        payload: msg
    }
}

export default testButtonActionCreator