// src/utils/EventBus.ts
import mitt, { Emitter } from 'mitt';
import { Events } from '../types/events';

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;