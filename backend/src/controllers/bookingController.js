import Booking from '../models/Booking.js';
import { upsertPatientRecord } from './patientController.js';

// Create new booking / registration
export const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      patientName,
      phone,
      patientPhone,
      email,
      patientEmail,
      gender,
      department,
      doctor,
      doctorId,
      preferredDate,
      appointmentDate,
      preferredTime,
      timeSlot,
      message,
      patientType = 'New Patient',
      uhid: customUhid = '',
    } = req.body;

    const finalName = fullName || patientName;
    const finalPhone = phone || patientPhone;
    const finalEmail = email || patientEmail || '';
    const finalDate = preferredDate || appointmentDate;
    const finalSlot = preferredTime || timeSlot || 'Any';

    if (!finalName || !finalPhone || !department || !finalDate) {
      return res.status(400).json({ success: false, message: 'Required fields missing: Name, Phone, Department, Date' });
    }

    const bookingId = 'KGN-' + Date.now();
    const tokenNumber = 'OPD-' + Math.floor(100 + Math.random() * 900);

    // Determine UHID
    let generatedUhid = customUhid;
    if (!generatedUhid || patientType === 'New Patient') {
      generatedUhid = generatedUhid || `UHID-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    // Upsert Patient Memory
    const patientRecord = await upsertPatientRecord({
      uhid: generatedUhid,
      name: finalName,
      phone: finalPhone,
      email: finalEmail,
      gender: gender || '',
      patientType,
    });

    const finalAssignedUhid = patientRecord?.uhid || generatedUhid;

    const booking = new Booking({
      bookingId,
      patientPhone: finalPhone,
      patientName: finalName,
      patientEmail: finalEmail,
      department,
      doctorId: doctorId || null,
      doctorName: doctor || '',
      appointmentDate: finalDate,
      timeSlot: finalSlot,
      patientType: patientType === 'Old Patient' ? 'Old Patient' : 'New Patient',
      uhid: finalAssignedUhid,
      tokenNumber,
      message: message || '',
      status: 'Pending',
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Appointment & registration completed successfully',
      bookingId,
      uhid: finalAssignedUhid,
      tokenNumber,
      patientType: booking.patientType,
      booking,
    });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
