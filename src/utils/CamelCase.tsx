export function ToCamelCase(str: string) {
    return str.toLowerCase().split(' ')
        .map((word, sakuin) =>
            sakuin === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
}