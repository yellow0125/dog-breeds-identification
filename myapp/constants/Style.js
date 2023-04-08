import { StyleSheet } from 'react-native'
import Colors from './Color'
import { Dimensions } from 'react-native'


const container = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flexWrap: "wrap"
    },
    containerPadding: {
        flex: 1,
        padding: 15
    },
    center: {
        flex: 1,
        backgroundColor: Colors.BgDarkGreen

    },

    horizontal: {
        flexDirection: 'row',
        display: 'flex',
    },
    form: {
        flex: 1,
        margin: 25
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        aspectRatio: 1 / 1,

    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1 / 1,
        height: 70
    },
    gallery: {

        borderWidth: 1,
        borderColor: 'gray',
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%'
    },
    chatRight: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end'

    },
    chatLeft: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end',
        textAlign: 'right',
        alignSelf: 'flex-start'
    },
    containerAdd: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingTop: 30,
    },
    post: {
        backgroundColor: Colors.BgLightGreen,
        width: 300,
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
    picker: {
        backgroundColor: Colors.BgDarkGreen,
    },
    pickerItem: {
        color: Colors.White,
        backgroundColor: Colors.BgDarkGreen,
    },
    post2: {
        width: "100%",
        marginTop: 10,
    },

    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 2,
        borderColor: Colors.darkBlack,
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 30,
        alignSelf: 'center',
        marginLeft:200,
    },
    NoRecipeImage: {
        width: "100%",
        height: "100%"
    },
    wholeContainer: {
        borderRadius: 5,
        marginTop: 4,
        marginRight: 5,
        marginBottom: 5,

        width: Dimensions.get('window').width * 0.5,
    },


})

const form = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    bottomButton: {
        alignSelf: 'center',
        alignContent: 'center',
        borderColor: Colors.darkBlack,
        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'center',
        marginTop: 20,

    },
    roundImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    button: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 220,
        marginTop: 80,
        marginBottom: -150
    },
    uploadedImage: {
        justifyContent: 'center',
        width: '100%',
        height: 200
    },
    imageInPost: {
        justifyContent: 'center',
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    imageInPost2: {
        justifyContent: 'center',
        width: '46%',
        height: 170,
        margin: 5,

    },
    imageInDetail: {
        justifyContent: 'center',
        width: '80%',
        alignSelf:'center',
    },
    pictureButton: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    imageR: {
        width: '100%',
        height: '100%',
        borderRadius: 5,

    },
    selectToggle: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: Colors.BgDarkGreen,
        borderWidth: 2,
        margin: 5,
    },
    RecipeListTitle: {
        color: Colors.DescriptionText,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    NoRecipePagetext: {
        fontSize: 16,
        alignSelf: 'center',
        margin: 5
    }

})

export { container, form } 