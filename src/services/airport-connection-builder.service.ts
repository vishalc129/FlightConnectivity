import axios from 'axios';

export const AirportConnectionBuilderService = {
    getAirportList: () => {
        return {
            data: [
                { "arptCd": "BOM", "arptName": "Chhatrapati Shivaji Maharaj International Airport", "cityName": "Mumbai", "coordinates": "19°05′19″N 72°52′05″E" },
                { "arptCd": "DXB", "arptName": "Dubai Internation Airport", "cityName": "Dubai", "coordinates": "25°15′10″N 055°21′52″E" },
                { "arptCd": "JFK", "arptName": "Jhon F Kennedy Airport", "cityName": "New York", "coordinates": "40°38′23″N 073°46′44″W" }
            ]
        }
    },

    getAllFlightDetails: (payload: { from: string; to: string }) => {
        return {
            data: [
                {
                    id: '1',
                    "onwardFltNo": "EK 501",
                    "onwardDepArpt": "BOM",
                    "onwardArrArpt": "DXB",
                    "onwardDepTime": "4:30",
                    "onwardArrTime": "6:00",
                    "connFltNo": "EK 201",
                    "connDepArpt": "DXB",
                    "connArrArpt": "JFK",
                    "connDepTime": "8:30",
                    "connArrTime": "14:25"
                },
                {
                    id: '2',
                    "onwardFltNo": "EK 501",
                    "onwardDepArpt": "BOM",
                    "onwardArrArpt": "DXB",
                    "onwardDepTime": "4:30",
                    "onwardArrTime": "6:00",
                    "connFltNo": "EK 205",
                    "connDepArpt": "DXB",
                    "connArrArpt": "JFK",
                    "connDepTime": "9:45",
                    "connArrTime": "19:00"
                }
            ]
        }
    }
}
