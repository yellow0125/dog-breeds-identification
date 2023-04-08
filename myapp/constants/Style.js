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
    imageInDetail: {
        marginTop:15,
        justifyContent: 'center',
        width: '95%',
        alignSelf:'center',
    },
    imageR: {
        width: '100%',
        height: '100%',
        borderRadius: 50,

    },

})

export { container, form } 