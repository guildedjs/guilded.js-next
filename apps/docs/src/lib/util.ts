export const getUnscopedPackageName = (str: string) => str.includes("/") ? str.split("/")[1] : str;