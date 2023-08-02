# CONSULTAS MongoDB

En este Taller estamos Generando una Base de Datos apartir de la imagen suministrada,
dando paso a la generacion de ciertas consultas especificadas en el siguiente documento 

[PDF DOCUMENTO ALQUILER DE AUTOS](docs/Alquiler_de_Autos.pdf)

# DISEÑO BASE DE DATOS

<img src="./img/f0a1e19f-3e39-4a35-83b8-6b9fce05d285.jpeg">

# ALGUNOS OPERADORES USADOS

## $or

The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>. The $or has the following syntax:

```js
    { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
```

## $and

performs a logical AND operation on an array of one or more expressions (<expression1>, <expression2>, and so on) and selects the documents that satisfy all the expressions.

```js
    { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
```

## $eq

Specifies equality condition. The $eq operator matches documents where the value of a field equals the specified value.

```js
    { <field>: { $eq: <value> } }
```

## $gt

selects those documents where the value of the field is greater than (i.e. >) the specified value.

```js
    { field: { $gt: value } }
```

## $gte

selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.).

```js
    { field: { $gte: value } }
```

## $lt

selects the documents where the value of the field is less than (i.e. <) the specified value.

```js
    { field: { $lt: value } }
```

## $lte

selects the documents where the value of the field is less than or equal to (i.e. <=) the specified value.

```js
    { field: { $lte: value } }
```

## $exists

When <boolean> is true, $exists matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field

```js
    { field: { $exists: <boolean> } }
```

# TECNOLOGIAS USADAS

<div>
<img src="./img/GFz_P-5e_400x400.png" alt="MySQL Logo" width="100">
<img src="./img/mongodb-compass.png" alt="MySQL Logo" width="100">
<img src="./img/Unofficial_JavaScript_logo_2.svg.png" alt="MySQL Logo" width="100">
</div>

# EXTENSIONES USADAS

MongoDB for VS Code

### Autor : Jose Alberto Cabrejo Villar