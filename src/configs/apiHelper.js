export async function callApi(instance, url, method, body) {
    try {
        const result = await instance[method](url, body).then(r => r.data);
        return { isSuccess: true, data: result };
    } catch (error) {
        return { isSuccess: false, error }
    }
}