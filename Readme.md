## Algoritmo para calcular el vector de desplazamiento para llevar un punto desde A hasta B
1. Identificación de Puntos Inicial y Final:
Supongamos que tienes un objeto en un punto inicial (x1, y1) y quieres que se mueva hacia un punto final (x2, y2).

2. Cálculo de las Diferencias en Coordenadas:
Calcula las diferencias en las coordenadas (x) y (y):

dx = x2​−x1​
dy = y2​−y1​

3. Formación del Vector de Desplazamiento:
Estas diferencias (dx) y (dy) forman el vector de desplazamiento (\vec{d}):

d = (dx,dy)

4. Cálculo de la Magnitud del Vector:
La magnitud (o longitud) del vector se calcula usando la fórmula de la distancia euclidiana que es la raiz cuadrada de dx^2 + dy^2:

Math.sqrt(dx * dx + dy * dy)​

5. Normalización del Vector:
Para obtener un vector unitario (un vector con magnitud 1) que apunta en la misma dirección, divides cada componente del vector por su magnitud:

(dx/d, dy/d)

6. Multiplicación por la Velocidad:
Si quieres que el objeto se mueva a una velocidad específica, multiplicas el vector unitario por esa velocidad:

vx = (dx/d) * speed
vy = (dy/d) * speed

7. Actualización de la Posición:
Finalmente, usas las componentes del vector de velocidad (\vec{v}) para actualizar la posición del objeto en cada frame:
x​ += vx​
y +​= vy​