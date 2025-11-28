export const formatDate = (pDate: Date): string => {
    let date = pDate.getDate().toString();
    let month = (pDate.getMonth() + 1).toString();

    if (pDate.getDate() < 10) {
        date = '0' + date;
    }

    if (pDate.getMonth() + 1 < 10) {
        month = '0' + month;
    }

    return date + '/' + month + '/' + pDate.getFullYear();
}