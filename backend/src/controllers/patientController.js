import Patient from '../models/Patient.js';

// Lookup patient by UHID or phone number
export const lookupPatient = async (req, res) => {
  try {
    const query = (req.query.query || req.query.uhid || req.query.phone || '').trim();
    if (!query) {
      return res.status(400).json({ success: false, message: 'UHID or Phone number query is required' });
    }

    // Clean query
    const cleanQuery = query.toUpperCase();

    // Search by exact UHID or phone match
    let patient = await Patient.findOne({
      $or: [
        { uhid: cleanQuery },
        { phone: query },
        { phone: query.replace(/\D/g, '') },
      ],
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'No patient record found matching that UHID or phone number.',
      });
    }

    res.json({
      success: true,
      patient: {
        uhid: patient.uhid,
        name: patient.name,
        phone: patient.phone,
        email: patient.email || '',
        gender: patient.gender || '',
        visitCount: patient.visitCount || 1,
        lastVisit: patient.lastVisit,
      },
    });
  } catch (error) {
    console.error('Patient Lookup Error:', error);
    res.status(500).json({ success: false, message: 'Server error during patient lookup' });
  }
};

// Internal helper to create or update patient memory on booking
export const upsertPatientRecord = async ({ uhid, name, phone, email, gender, patientType }) => {
  try {
    let finalUhid = uhid;

    if (!finalUhid || patientType === 'New Patient') {
      finalUhid = finalUhid || `UHID-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    let patient = await Patient.findOne({
      $or: [{ uhid: finalUhid }, { phone }],
    });

    if (patient) {
      patient.name = name || patient.name;
      patient.phone = phone || patient.phone;
      if (email) patient.email = email;
      if (gender) patient.gender = gender;
      patient.visitCount = (patient.visitCount || 1) + 1;
      patient.lastVisit = new Date();
      await patient.save();
    } else {
      patient = new Patient({
        uhid: finalUhid,
        name,
        phone,
        email: email || '',
        gender: gender || '',
        visitCount: 1,
        lastVisit: new Date(),
      });
      await patient.save();
    }

    return patient;
  } catch (err) {
    console.error('Upsert Patient Error:', err);
    return null;
  }
};
