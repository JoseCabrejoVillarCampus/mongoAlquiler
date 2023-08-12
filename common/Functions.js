import {  plainToClass } from "class-transformer";

export const processErrors = async (errors, dto) => {
    const listErrors = [];

    for (const error of errors) {
        if (error.operatorName === "properties") {
            const properties = [];

            for (const prop of error.propertiesNotSatisfied) {
                const property = prop.propertyName;
                properties.push(property);
            }

            listErrors.push(...properties);
        }
    }
    console.log(listErrors);
    const transformed = plainToClass(dto, listErrors,{
        strategy:'exposeAll',
        excludeExtraneousValues: true
    });

    console.log(transformed);

    return listErrors;
};