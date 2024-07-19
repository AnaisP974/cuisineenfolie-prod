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
    const regex = /^\d+$/;
    return regex.test(number.toString());
};