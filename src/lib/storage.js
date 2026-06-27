import { mockClients } from '../data/mockClients'

const CLIENTS_KEY = 'coach_clients'
const AUTH_KEY = 'coach_auth'
const DATA_VERSION = '3'

export function getClients() {
  const version = localStorage.getItem('coach_data_version')
  if (version !== DATA_VERSION) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(mockClients))
    localStorage.setItem('coach_data_version', DATA_VERSION)
    return mockClients
  }
  const stored = localStorage.getItem(CLIENTS_KEY)
  if (stored) return JSON.parse(stored)
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(mockClients))
  return mockClients
}

export function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients))
}

export function getClient(id) {
  return getClients().find((c) => c.id === Number(id))
}

export function updateClient(id, data) {
  const clients = getClients()
  const idx = clients.findIndex((c) => c.id === Number(id))
  if (idx === -1) return
  clients[idx] = { ...clients[idx], ...data }
  saveClients(clients)
  return clients[idx]
}

export function createClient(data) {
  const clients = getClients()
  const id = Math.max(...clients.map((c) => c.id), 0) + 1
  const client = { id, notes: [], payments: [], program: '', ...data }
  saveClients([...clients, client])
  return client
}

export function addNote(clientId, text) {
  const client = getClient(clientId)
  if (!client) return
  const note = { date: new Date().toISOString().split('T')[0], text }
  const updated = { ...client, notes: [note, ...(client.notes || [])] }
  updateClient(clientId, updated)
  return updated
}

export function addPayment(clientId, payment) {
  const client = getClient(clientId)
  if (!client) return
  const updated = { ...client, payments: [payment, ...(client.payments || [])] }
  updateClient(clientId, updated)
  return updated
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function login(password) {
  const ADMIN_PASSWORD = 'coach2025'
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function deleteClient(id) {
  saveClients(getClients().filter((c) => c.id !== Number(id)))
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}
