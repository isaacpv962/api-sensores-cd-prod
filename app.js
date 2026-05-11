const express = require('express');
const app = express();

app.use(express.json());

let sensors = [
  { id: 1, name: 'Sensor Temperatura', device: 'ESP32 Devkit V1 Type C', value: 25.4 },
  { id: 2, name: 'Sensor Humedad', device: 'Arduino Uno', value: 60.0 }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/sensors', (req, res) => {
  res.status(200).json(sensors);
});

app.get('/api/sensors/:id', (req, res) => {
  const sensor = sensors.find(s => s.id === parseInt(req.params.id));
  if (!sensor) return res.status(404).json({ message: 'Sensor no encontrado' });
  res.status(200).json(sensor);
});

app.post('/api/sensors', (req, res) => {
  const newSensor = {
    id: sensors.length > 0 ? sensors[sensors.length - 1].id + 1 : 1,
    name: req.body.name,
    device: req.body.device,
    value: req.body.value
  };
  sensors.push(newSensor);
  res.status(201).json(newSensor);
});

app.delete('/api/sensors/:id', (req, res) => {
  const sensorIndex = sensors.findIndex(s => s.id === parseInt(req.params.id));
  if (sensorIndex === -1) return res.status(404).json({ message: 'Sensor no encontrado' });

  const deletedSensor = sensors.splice(sensorIndex, 1);
  res.status(200).json(deletedSensor[0]);
});

module.exports = app;