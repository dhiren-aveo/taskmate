export default async function run(nango:any) {
    const response = await nango.get({
        endpoint: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    });

    return response.data.items;
}
