import api from './api';
import { stripHindiText, normalizeDepartmentName } from '../utils/textUtils';

export const bookingService = {
  /**
   * Submit an appointment request directly to POST /api/bookings
   * Cleans patientName, department, and doctor fields before posting.
   */
  async createBooking(form) {
    const payload = {
      fullName: stripHindiText(form.fullName),
      patientName: stripHindiText(form.fullName),
      phone: form.phone,
      patientPhone: form.phone,
      email: form.email || '',
      patientEmail: form.email || '',
      gender: form.gender || '',
      department: normalizeDepartmentName(form.department),
      doctor: stripHindiText(form.doctor),
      doctorId: form.doctorId || null,
      preferredDate: form.preferredDate,
      appointmentDate: form.preferredDate,
      preferredTime: form.preferredTime || 'Any',
      timeSlot: form.preferredTime || 'Any',
      message: stripHindiText(form.message || ''),
      problemDescription: stripHindiText(form.message || ''),
      patientType: form.patientType || 'New Patient',
      uhid: form.uhid || '',
      type: 'OPD',
      source: form.source || form.bookingSource || 'website',
      bookingSource: form.source || form.bookingSource || 'website',
    };

    const response = await api.post('/bookings', payload);
    const data = response.data || {};

    const bookingId =
      data.bookingId ||
      data.booking?.bookingId ||
      data.id ||
      '';

    const uhid =
      data.uhid ||
      data.patient?.uhid ||
      data.booking?.uhid ||
      data.patientId?.uhid ||
      form.uhid ||
      '';

    const tokenNumber =
      data.tokenNumber ||
      data.token_number ||
      data.booking?.tokenNumber ||
      data.token ||
      '';

    return {
      success: true,
      bookingId,
      uhid,
      tokenNumber,
      patientType: data.patientType || form.patientType || 'New Patient',
      booking: data.booking || data,
      message: data.message || 'Appointment request registered successfully',
    };
  },

  /**
   * Lookup existing patient memory by UHID or Phone number
   */
  async lookupPatient(query) {
    try {
      const response = await api.get('/patients/lookup', {
        params: { query },
      });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Patient record not found.';
      return { success: false, message: msg };
    }
  },
};

export default bookingService;
