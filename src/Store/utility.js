export const updateObject = (oldObjet, updateProperties) => {
    return {
        ...oldObjet,
        ...updateProperties
    };
};