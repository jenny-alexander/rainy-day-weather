export default class Formatter {

      static convertDate = (date: number) => {
        let formattedDate: Date = new Date(date*1000);
        const outDate: string = formattedDate.toLocaleDateString('en-US');
        const outTime: string = formattedDate.toLocaleTimeString('en-US');
        return outDate + ' ' + outTime;
    }      
}