
class Helper {
    static getCurrentDate = () => {
        const today = new Date()
        const date =
            today.getFullYear() +
            " " +
            (today.getMonth() + 1) +
            " " +
            today.getDate();
        return date;
    }
}
export default Helper;