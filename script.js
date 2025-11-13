// Lista de técnicos
const technicians = [
    'ALINEACIÓN Y BALANCEO',
    'EM1',
    'EM2',
    'RG2',
    'LARRY B',
    'PEDRO P',
    'MAURICIO J',
    'BRAYAM F',
    'ALEXANDER M',
    'LAV1',
    'LAV2'
];

// Horas del día
const hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '18:30'];

// Color seleccionado actualmente
let selectedColor = 'red';

// Inicializar la tabla
function initializeTable() {
    const tableBody = document.getElementById('tableBody');
    
    technicians.forEach(technician => {
        const row = document.createElement('tr');
        
        // Celda del nombre del técnico
        const nameCell = document.createElement('td');
        nameCell.textContent = technician;
        nameCell.className = 'technician-name';
        row.appendChild(nameCell);
        
        // Celdas de horas
        hours.forEach(hour => {
            const cell = document.createElement('td');
            cell.className = 'cell';
            cell.dataset.technician = technician;
            cell.dataset.hour = hour;
            cell.addEventListener('click', handleCellClick);
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
    
    // Cargar datos guardados
    loadSavedData();
}

// Manejar clic en celda
function handleCellClick(event) {
    const cell = event.target;
    
    // Remover todas las clases de color
    cell.classList.remove('red', 'yellow', 'blue');
    
    // Si el color seleccionado es 'clear', limpiar la celda
    if (selectedColor === 'clear') {
        cell.className = 'cell';
    } else {
        // Aplicar el color seleccionado
        cell.className = `cell ${selectedColor}`;
    }
    
    // Guardar datos
    saveData();
}

// Cambiar color seleccionado
function setupColorButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            colorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            // Actualizar color seleccionado
            selectedColor = button.dataset.color;
        });
    });
}

// Guardar datos en localStorage
function saveData() {
    const data = {};
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => {
        const technician = cell.dataset.technician;
        const hour = cell.dataset.hour;
        const color = cell.classList.contains('red') ? 'red' :
                     cell.classList.contains('yellow') ? 'yellow' :
                     cell.classList.contains('blue') ? 'blue' : 'none';
        
        if (!data[technician]) {
            data[technician] = {};
        }
        
        if (color !== 'none') {
            data[technician][hour] = color;
        }
    });
    
    localStorage.setItem('scheduleData', JSON.stringify(data));
}

// Cargar datos guardados
function loadSavedData() {
    const savedData = localStorage.getItem('scheduleData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.keys(data).forEach(technician => {
            Object.keys(data[technician]).forEach(hour => {
                const cell = document.querySelector(
                    `[data-technician="${technician}"][data-hour="${hour}"]`
                );
                
                if (cell) {
                    cell.classList.remove('red', 'yellow', 'blue');
                    cell.classList.add(data[technician][hour]);
                }
            });
        });
    }
}

// Limpiar todo
function setupClearButton() {
    const clearButton = document.getElementById('clearAll');
    
    clearButton.addEventListener('click', () => {
        if (confirm('¿Está seguro de que desea limpiar todo el tablero?')) {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.classList.remove('red', 'yellow', 'blue');
                cell.className = 'cell';
            });
            
            localStorage.removeItem('scheduleData');
        }
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    initializeTable();
    setupColorButtons();
    setupClearButton();
});

