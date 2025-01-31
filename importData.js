require("./src/database/config/config");
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const User = require("./src/database/models/user"); 

// Borrar todos los documentos de la colección 'users'
User.deleteMany({})
  .then(() => console.log('All the data was deleted'))
  .catch(err => console.error('Error trying to delete data:', err));

// Función para calcular el "score" basado en experiencia, cargo, industria y tamaño de empresa
const calculateScore = (jobTitle, yearsInCompany, industry, companySize) => {
  let jobWeight, industryWeight, experienceScore, companySizeScore;

  // Ponderación por cargo
  const jobWeights = {
    "CEO": 1.0,
    "CTO": 0.9,
    "Manager": 0.8,
    "Software Engineer": 0.7,
    "Project Manager": 0.75,
    "Sales Representative": 0.6,
    "Account Manager": 0.65,
    "Technical Support": 0.55,
    "Network Engineer": 0.65,
    "System Administrator": 0.7,
    "Business Analyst": 0.65,
    "IT Director": 0.85,
    "Mobile Developer": 0.65,
    "Data Scientist": 0.75,
    "Machine Learning Engineer": 0.85,
    "Security Analyst": 0.75,
    "Technical Lead": 0.8,
    "Front-End Developer": 0.7,
    "Back-End Developer": 0.7,
  };

  jobWeight = jobWeights[jobTitle] || 0.5; // Valor predeterminado si el cargo no está en la lista.

  // Ponderación por industria
  const industryWeights = {
    "Finance": 1.0,
    "Healthcare": 0.85,
    "Information Technology": 0.9,
    "Retail": 0.75,
    "Marketing": 0.8,
    "Telecommunications": 0.75,
  };

  industryWeight = industryWeights[industry] || 0.6; // Valor predeterminado si la industria no está en la lista.

  // Puntaje por años de experiencia (escalado lineal de 0 a 100, con un rango moderado)
  experienceScore = Math.min((yearsInCompany * 4), 100); // Años de experiencia multiplicados por 4, con límite de 100

  // Puntaje por tamaño de la empresa con un rango más amplio
  if (companySize >= 2000) companySizeScore = 100;
  else if (companySize >= 1500) companySizeScore = 90;
  else if (companySize >= 1000) companySizeScore = 80;
  else if (companySize >= 900) companySizeScore = 70;
  else if (companySize >= 700) companySizeScore = 60;
  else if (companySize >= 500) companySizeScore = 50;
  else companySizeScore = 40;

  // Cálculo final del score ponderado
  let score = (
    (experienceScore * 0.15) +   // 15% del puntaje total por experiencia
    (companySizeScore * 0.32) +  // 32% del puntaje total por tamaño de empresa
    (industryWeight * 0.28) +     // 28% del puntaje total por industria
    (jobWeight * 0.25)            // 25% del puntaje total por cargo
  );

  // Asegurarse de que el puntaje final esté entre 0 y 100
  return Math.round(Math.min(score, 100));
};


// Leer y procesar el CSV
const importCSV = async (filePath) => {
  const users = [];

  fs.createReadStream(filePath)
    .pipe(csv({ headers: false, skipEmptyLines: true }))
    .on("data", (row) => {
      // Extraer los datos de cada fila
      const [name, email, country, jobTitle, yearsOfExperience, industry, companySize] = Object.values(row);

      // Asegurarse de que los valores se convierten correctamente a los tipos necesarios
      const experience = Number(yearsOfExperience);
      const size = Number(companySize);

      // Calcular el score usando todos los parámetros
      const score = calculateScore(jobTitle, experience, industry, size);

      // Crear un nuevo usuario con los datos y el score calculado
      const user = new User({
        name,
        email,
        country,
        jobTitle,
        yearsOfExperience: experience,
        industry,
        companySize: size,
        score
      });

      // Guardar el usuario en el array
      users.push(user);
    })
    .on("end", async () => {
      try {
        await User.insertMany(users);
        console.log("Data imported.");
        mongoose.connection.close();
      } catch (err) {
        console.error("Error importing data:", err);
      }
    });
};

importCSV("data.csv");  // Asegúrate de que el archivo CSV esté en el lugar correcto
