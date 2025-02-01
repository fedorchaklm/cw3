export const retrieveLocalStorage = <T>(key: string) => {
    const str = localStorage.getItem(key) || '';
    try {
        const obj = JSON.parse(str);
        return obj as T;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const saveToLocalStorage = (key: string, value: object | string | number) => {
    localStorage.setItem(key, JSON.stringify(value));
}