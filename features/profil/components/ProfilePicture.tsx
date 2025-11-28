import { Image, StyleSheet, Text, View } from 'react-native';

interface props {
    pseudo: string;
}

const ProfilePicture = ({ pseudo }: props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://i.pinimg.com/originals/0f/aa/60/0faa6031079ed3c986226d115dfb864d.jpg" }} borderRadius={1000} style={styles.image} />
            <Text style={styles.text}>{pseudo}</Text>
        </View>
    );
};

export default ProfilePicture;

const styles = StyleSheet.create({
    container: {
        width: '45%'
    },
    image: {
        width: '100%',
        aspectRatio: 1/1
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 20,
        marginTop: 10
    }
});