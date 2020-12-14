const selectUserActionCreator = (user) => {
    console.log("You clicked on ", user.fname)
    return {
        type: 'USER-SELECTED',
        payload: user
    }
}

export default selectUserActionCreator