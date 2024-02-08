export default function DateToString(date){
    if(!date)
        date = now();

    return `${date.getFullYear()}`;
}
