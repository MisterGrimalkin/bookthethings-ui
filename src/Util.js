class Util {

    static getQueryParam(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    static leadingZero(n) {
        return n > 9 ? ""+n : "0"+n;
    }

    static rateDescription(rate) {
        let dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        let startBits = rate.start_time.split("T")[1].split(":");
        let endBits = rate.end_time.split("T")[1].split(":");
        return (
            dayNames[rate.day]
            + " " + startBits[0] + ":" + startBits[1]
            + "-" + endBits[0] + ":" + endBits[1]
        );
    };

}

export default Util;