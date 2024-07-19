/**
 * Retourne true si le texte passé en paramètre a entre min et max caractères
 * et ne contient pas les symboles: "<", ">".
 * @param text - Le texte à vérifier.
 * @param min - Le nombre minimal de caractères.
 * @param max - Le nombre maximal de caractères.
 * @returns true si le texte respecte les conditions, sinon false.
 */
export const isStringValid = (text: string, min: number, max: number): boolean => {
    const regex = new RegExp(`^(?!.*[<>]).{${min},${max}}$`);
    return regex.test(text);
};

/**
 * Vérifie si une chaîne de caractères contient uniquement des chiffres.
 * @param number - nombre à vérifier.
 * @returns true si la chaîne contient uniquement des chiffres, sinon false.
 */
export const isNumber = (number: number): boolean => {
    const regex = /^(?!0+$)\d+$/;
    return regex.test(number.toString());
};

/**
 * Vérifie si la chaîne passée en paramètre est une URL valide.
 * @param url - La chaîne à vérifier.
 * @returns true si la chaîne est une URL valide, sinon false.
 */
export const isValidUrl = (url: string): boolean => {
    // Expression régulière pour valider une URL
    const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/;
    return regex.test(url);
};