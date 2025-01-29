export const retriveLocalStorage = <T>(key: string) => {
    const str = localStorage.getItem(key) || '';
    const obj = JSON.parse(str);
    return obj as T;
}

export const saveToLocalStorage = (key: string, value: object | string | number) => {
    localStorage.setItem(key, JSON.stringify(value));
}