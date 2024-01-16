export const validateAddress = (addresValue: String): Boolean => {
    return addresValue.length === 66 && addresValue.startsWith('0x');

}