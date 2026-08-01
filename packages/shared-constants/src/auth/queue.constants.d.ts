/**
 * Queue management constants for the monorepo
 * All queue-related constants are centralized here for consistent message queue handling
 */
/**
 * Queue names for different job types
 */
export declare const QUEUE_NAMES: {
    /**
     * Email queue for sending emails
     */
    readonly EMAIL: "email";
    /**
     * SMS queue for sending SMS messages
     */
    readonly SMS: "sms";
    /**
     * Webhook queue for processing webhooks
     */
    readonly WEBHOOK: "webhook";
    /**
     * Payment processing queue
     */
    readonly PAYMENT: "payment";
    /**
     * bKash payment queue (Bangladesh)
     */
    readonly BKASH: "bkash";
    /**
     * Nagad payment queue (Bangladesh)
     */
    readonly NAGAD: "nagad";
    /**
     * Rocket payment queue (Bangladesh)
     */
    readonly ROCKET: "rocket";
    /**
     * SSL Commerz payment queue (Bangladesh)
     */
    readonly SSL_COMMERZ: "ssl-commerz";
    /**
     * Courier service queue
     */
    readonly COURIER: "courier";
    /**
     * Courier service queue for Bangladesh
     */
    readonly COURIER_BD: "courier-bd";
    /**
     * Notification queue for push notifications
     */
    readonly NOTIFICATION: "notification";
    /**
     * Analytics queue for processing analytics
     */
    readonly ANALYTICS: "analytics";
    /**
     * Report generation queue
     */
    readonly REPORT: "report";
    /**
     * File processing queue
     */
    readonly FILE_PROCESSING: "file-processing";
    /**
     * Image processing queue
     */
    readonly IMAGE_PROCESSING: "image-processing";
    /**
     * Video processing queue
     */
    readonly VIDEO_PROCESSING: "video-processing";
    /**
     * Data import queue
     */
    readonly DATA_IMPORT: "data-import";
    /**
     * Data export queue
     */
    readonly DATA_EXPORT: "data-export";
    /**
     * Backup queue
     */
    readonly BACKUP: "backup";
    /**
     * Sync queue for data synchronization
     */
    readonly SYNC: "sync";
    /**
     * Audit log queue
     */
    readonly AUDIT_LOG: "audit-log";
    /**
     * Dead Letter Queue for failed jobs
     */
    readonly DEAD_LETTER: "dead-letter";
    /**
     * Default queue
     */
    readonly DEFAULT: "default";
};
export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
/**
 * Exchange names for RabbitMQ
 */
export declare const EXCHANGE_NAMES: {
    /**
     * Email exchange
     */
    readonly EMAIL: "exchange.email";
    /**
     * SMS exchange
     */
    readonly SMS: "exchange.sms";
    /**
     * Payment exchange
     */
    readonly PAYMENT: "exchange.payment";
    /**
     * Notification exchange
     */
    readonly NOTIFICATION: "exchange.notification";
    /**
     * Webhook exchange
     */
    readonly WEBHOOK: "exchange.webhook";
    /**
     * Analytics exchange
     */
    readonly ANALYTICS: "exchange.analytics";
    /**
     * File exchange
     */
    readonly FILE: "exchange.file";
    /**
     * Default exchange
     */
    readonly DEFAULT: "exchange.default";
    /**
     * Dead Letter exchange
     */
    readonly DEAD_LETTER: "exchange.dead-letter";
    /**
     * Direct exchange for routing
     */
    readonly DIRECT: "exchange.direct";
    /**
     * Topic exchange for pattern routing
     */
    readonly TOPIC: "exchange.topic";
    /**
     * Fanout exchange for broadcasting
     */
    readonly FANOUT: "exchange.fanout";
};
export type ExchangeName = (typeof EXCHANGE_NAMES)[keyof typeof EXCHANGE_NAMES];
/**
 * Routing keys for message routing
 */
export declare const ROUTING_KEYS: {
    /**
     * Email routing keys
     */
    readonly EMAIL: {
        readonly WELCOME: "email.welcome";
        readonly VERIFICATION: "email.verification";
        readonly PASSWORD_RESET: "email.password-reset";
        readonly ORDER_CONFIRMATION: "email.order-confirmation";
        readonly PAYMENT_RECEIPT: "email.payment-receipt";
        readonly SHIPPING_UPDATE: "email.shipping-update";
        readonly NEWSLETTER: "email.newsletter";
        readonly PROMOTIONAL: "email.promotional";
        readonly SYSTEM: "email.system";
        readonly ADMIN: "email.admin";
    };
    /**
     * SMS routing keys
     */
    readonly SMS: {
        readonly OTP: "sms.otp";
        readonly VERIFICATION: "sms.verification";
        readonly NOTIFICATION: "sms.notification";
        readonly PROMOTIONAL: "sms.promotional";
        readonly ALERT: "sms.alert";
        readonly ORDER_UPDATE: "sms.order-update";
        readonly PAYMENT_CONFIRMATION: "sms.payment-confirmation";
        readonly DELIVERY_UPDATE: "sms.delivery-update";
    };
    /**
     * Payment routing keys
     */
    readonly PAYMENT: {
        readonly PROCESS: "payment.process";
        readonly VERIFY: "payment.verify";
        readonly REFUND: "payment.refund";
        readonly REVERSE: "payment.reverse";
        readonly CALLBACK: "payment.callback";
        readonly WEBHOOK: "payment.webhook";
        readonly SETTLEMENT: "payment.settlement";
        readonly RECONCILIATION: "payment.reconciliation";
        readonly FAILED: "payment.failed";
    };
    /**
     * Bangladesh payment gateway routing keys
     */
    readonly BD_PAYMENT: {
        readonly BKASH: {
            readonly PROCESS: "payment.bkash.process";
            readonly VERIFY: "payment.bkash.verify";
            readonly REFUND: "payment.bkash.refund";
            readonly CALLBACK: "payment.bkash.callback";
            readonly WEBHOOK: "payment.bkash.webhook";
        };
        readonly NAGAD: {
            readonly PROCESS: "payment.nagad.process";
            readonly VERIFY: "payment.nagad.verify";
            readonly REFUND: "payment.nagad.refund";
            readonly CALLBACK: "payment.nagad.callback";
            readonly WEBHOOK: "payment.nagad.webhook";
        };
        readonly ROCKET: {
            readonly PROCESS: "payment.rocket.process";
            readonly VERIFY: "payment.rocket.verify";
            readonly REFUND: "payment.rocket.refund";
            readonly CALLBACK: "payment.rocket.callback";
            readonly WEBHOOK: "payment.rocket.webhook";
        };
        readonly SSL_COMMERZ: {
            readonly PROCESS: "payment.ssl-commerz.process";
            readonly VERIFY: "payment.ssl-commerz.verify";
            readonly REFUND: "payment.ssl-commerz.refund";
            readonly CALLBACK: "payment.ssl-commerz.callback";
            readonly WEBHOOK: "payment.ssl-commerz.webhook";
        };
    };
    /**
     * Webhook routing keys
     */
    readonly WEBHOOK: {
        readonly PROCESS: "webhook.process";
        readonly RETRY: "webhook.retry";
        readonly FAILED: "webhook.failed";
        readonly VERIFY: "webhook.verify";
    };
    /**
     * Courier routing keys
     */
    readonly COURIER: {
        readonly CREATE_ORDER: "courier.create-order";
        readonly TRACK_ORDER: "courier.track-order";
        readonly UPDATE_STATUS: "courier.update-status";
        readonly CANCEL_ORDER: "courier.cancel-order";
        readonly DELIVERY_CONFIRM: "courier.delivery-confirm";
        readonly PICKUP_REQUEST: "courier.pickup-request";
    };
    /**
     * Bangladesh courier routing keys
     */
    readonly COURIER_BD: {
        readonly SAHAAJ: {
            readonly CREATE: "courier.sahaaj.create";
            readonly TRACK: "courier.sahaaj.track";
            readonly UPDATE: "courier.sahaaj.update";
            readonly CANCEL: "courier.sahaaj.cancel";
        };
        readonly PAPERFLY: {
            readonly CREATE: "courier.paperfly.create";
            readonly TRACK: "courier.paperfly.track";
            readonly UPDATE: "courier.paperfly.update";
            readonly CANCEL: "courier.paperfly.cancel";
        };
        readonly REDX: {
            readonly CREATE: "courier.redx.create";
            readonly TRACK: "courier.redx.track";
            readonly UPDATE: "courier.redx.update";
            readonly CANCEL: "courier.redx.cancel";
        };
    };
    /**
     * Notification routing keys
     */
    readonly NOTIFICATION: {
        readonly PUSH: "notification.push";
        readonly EMAIL: "notification.email";
        readonly SMS: "notification.sms";
        readonly IN_APP: "notification.in-app";
        readonly BROADCAST: "notification.broadcast";
    };
    /**
     * Analytics routing keys
     */
    readonly ANALYTICS: {
        readonly TRACK: "analytics.track";
        readonly AGGREGATE: "analytics.aggregate";
        readonly PROCESS: "analytics.process";
        readonly REPORT: "analytics.report";
    };
    /**
     * System routing keys
     */
    readonly SYSTEM: {
        readonly LOG: "system.log";
        readonly AUDIT: "system.audit";
        readonly ALERT: "system.alert";
        readonly MONITOR: "system.monitor";
        readonly BACKUP: "system.backup";
        readonly SYNC: "system.sync";
    };
    /**
     * File processing routing keys
     */
    readonly FILE: {
        readonly UPLOAD: "file.upload";
        readonly PROCESS: "file.process";
        readonly CONVERT: "file.convert";
        readonly COMPRESS: "file.compress";
        readonly DELETE: "file.delete";
    };
    /**
     * Dead Letter routing keys
     */
    readonly DEAD_LETTER: {
        readonly ALL: "dead-letter.all";
        readonly EMAIL: "dead-letter.email";
        readonly SMS: "dead-letter.sms";
        readonly PAYMENT: "dead-letter.payment";
        readonly WEBHOOK: "dead-letter.webhook";
    };
};
export type RoutingKey = (typeof ROUTING_KEYS.EMAIL)[keyof typeof ROUTING_KEYS.EMAIL] | (typeof ROUTING_KEYS.SMS)[keyof typeof ROUTING_KEYS.SMS] | (typeof ROUTING_KEYS.PAYMENT)[keyof typeof ROUTING_KEYS.PAYMENT] | (typeof ROUTING_KEYS.BD_PAYMENT.BKASH)[keyof typeof ROUTING_KEYS.BD_PAYMENT.BKASH] | (typeof ROUTING_KEYS.BD_PAYMENT.NAGAD)[keyof typeof ROUTING_KEYS.BD_PAYMENT.NAGAD] | (typeof ROUTING_KEYS.BD_PAYMENT.ROCKET)[keyof typeof ROUTING_KEYS.BD_PAYMENT.ROCKET] | (typeof ROUTING_KEYS.BD_PAYMENT.SSL_COMMERZ)[keyof typeof ROUTING_KEYS.BD_PAYMENT.SSL_COMMERZ] | (typeof ROUTING_KEYS.WEBHOOK)[keyof typeof ROUTING_KEYS.WEBHOOK] | (typeof ROUTING_KEYS.COURIER)[keyof typeof ROUTING_KEYS.COURIER] | (typeof ROUTING_KEYS.COURIER_BD.SAHAAJ)[keyof typeof ROUTING_KEYS.COURIER_BD.SAHAAJ] | (typeof ROUTING_KEYS.COURIER_BD.PAPERFLY)[keyof typeof ROUTING_KEYS.COURIER_BD.PAPERFLY] | (typeof ROUTING_KEYS.COURIER_BD.REDX)[keyof typeof ROUTING_KEYS.COURIER_BD.REDX] | (typeof ROUTING_KEYS.NOTIFICATION)[keyof typeof ROUTING_KEYS.NOTIFICATION] | (typeof ROUTING_KEYS.ANALYTICS)[keyof typeof ROUTING_KEYS.ANALYTICS] | (typeof ROUTING_KEYS.SYSTEM)[keyof typeof ROUTING_KEYS.SYSTEM] | (typeof ROUTING_KEYS.FILE)[keyof typeof ROUTING_KEYS.FILE] | (typeof ROUTING_KEYS.DEAD_LETTER)[keyof typeof ROUTING_KEYS.DEAD_LETTER];
/**
 * Base queue configuration type
 */
export interface QueueConfigItem {
    concurrency: number;
    maxAttempts: number;
    backoff: {
        type: 'exponential' | 'fixed';
        delay: number;
    };
    removeOnComplete: {
        age: number;
        count: number;
    };
    removeOnFail: {
        age: number;
        count: number;
    };
    stalledInterval: number;
    maxStalledCount: number;
    lockDuration: number;
}
/**
 * Queue configuration for each queue
 */
export declare const QUEUE_CONFIG: Record<QueueName, QueueConfigItem>;
/**
 * Dead Letter Queue configuration for each queue
 */
export declare const DLQ_CONFIG: {
    /**
     * Enable DLQ for all queues
     */
    readonly ENABLED: true;
    /**
     * DLQ prefix for queue names
     */
    readonly PREFIX: "dlq:";
    /**
     * Maximum retry attempts before sending to DLQ
     */
    readonly MAX_RETRY_ATTEMPTS: 5;
    /**
     * DLQ processing delay in seconds
     */
    readonly PROCESSING_DELAY: 60;
    /**
     * DLQ message TTL in seconds
     */
    readonly MESSAGE_TTL: 604800;
    /**
     * DLQ queue names
     */
    readonly QUEUES: {
        readonly EMAIL: "dlq:email";
        readonly SMS: "dlq:sms";
        readonly PAYMENT: "dlq:payment";
        readonly WEBHOOK: "dlq:webhook";
        readonly BKASH: "dlq:bkash";
        readonly NAGAD: "dlq:nagad";
        readonly ROCKET: "dlq:rocket";
        readonly SSL_COMMERZ: "dlq:ssl-commerz";
        readonly COURIER: "dlq:courier";
        readonly NOTIFICATION: "dlq:notification";
        readonly ANALYTICS: "dlq:analytics";
        readonly FILE_PROCESSING: "dlq:file-processing";
        readonly DEFAULT: "dlq:default";
    };
};
export type DLQQueue = (typeof DLQ_CONFIG.QUEUES)[keyof typeof DLQ_CONFIG.QUEUES];
/**
 * Queue priority levels
 */
export declare const QUEUE_PRIORITY: {
    /**
     * Critical priority - Highest priority
     */
    readonly CRITICAL: 1;
    /**
     * High priority
     */
    readonly HIGH: 2;
    /**
     * Medium priority
     */
    readonly MEDIUM: 3;
    /**
     * Low priority
     */
    readonly LOW: 4;
    /**
     * Background priority - Lowest priority
     */
    readonly BACKGROUND: 5;
};
export type QueuePriority = (typeof QUEUE_PRIORITY)[keyof typeof QUEUE_PRIORITY];
/**
 * Queue events for monitoring
 */
export declare const QUEUE_EVENTS: {
    /**
     * Job lifecycle events
     */
    readonly JOB_ADDED: "job.added";
    readonly JOB_STARTED: "job.started";
    readonly JOB_COMPLETED: "job.completed";
    readonly JOB_FAILED: "job.failed";
    readonly JOB_RETRY: "job.retry";
    readonly JOB_DELAYED: "job.delayed";
    readonly JOB_STALLED: "job.stalled";
    readonly JOB_PROGRESS: "job.progress";
    readonly JOB_REMOVED: "job.removed";
    readonly JOB_CLEANED: "job.cleaned";
    /**
     * Queue lifecycle events
     */
    readonly QUEUE_PAUSED: "queue.paused";
    readonly QUEUE_RESUMED: "queue.resumed";
    readonly QUEUE_DRAINED: "queue.drained";
    readonly QUEUE_ERROR: "queue.error";
    /**
     * DLQ events
     */
    readonly DLQ_MOVED: "dlq.moved";
    readonly DLQ_PROCESSED: "dlq.processed";
    readonly DLQ_FAILED: "dlq.failed";
    /**
     * Worker events
     */
    readonly WORKER_STARTED: "worker.started";
    readonly WORKER_STOPPED: "worker.stopped";
    readonly WORKER_ERROR: "worker.error";
};
export type QueueEvent = (typeof QUEUE_EVENTS)[keyof typeof QUEUE_EVENTS];
/**
 * Queue error messages
 */
export declare const QUEUE_ERROR_MESSAGES: {
    readonly QUEUE_NOT_FOUND: "Queue not found";
    readonly JOB_NOT_FOUND: "Job not found";
    readonly JOB_FAILED: "Job execution failed";
    readonly JOB_TIMEOUT: "Job execution timeout";
    readonly JOB_STALLED: "Job stalled";
    readonly QUEUE_PAUSED: "Queue is paused";
    readonly QUEUE_FULL: "Queue is full";
    readonly CONNECTION_FAILED: "Queue connection failed";
    readonly PUBLISH_FAILED: "Failed to publish message to queue";
    readonly CONSUME_FAILED: "Failed to consume message from queue";
    readonly ACK_FAILED: "Failed to acknowledge message";
    readonly RETRY_EXCEEDED: "Maximum retry attempts exceeded";
    readonly DLQ_MOVE_FAILED: "Failed to move job to DLQ";
    readonly DLQ_PROCESS_FAILED: "Failed to process DLQ message";
    readonly SERIALIZATION_FAILED: "Failed to serialize job data";
    readonly DESERIALIZATION_FAILED: "Failed to deserialize job data";
    readonly INVALID_JOB_DATA: "Invalid job data";
    readonly JOB_CANCELLED: "Job cancelled by user";
    readonly WORKER_ERROR: "Worker encountered an error";
};
export type QueueErrorMessage = (typeof QUEUE_ERROR_MESSAGES)[keyof typeof QUEUE_ERROR_MESSAGES];
/**
 * Queue success messages
 */
export declare const QUEUE_SUCCESS_MESSAGES: {
    readonly JOB_ADDED: "Job added to queue successfully";
    readonly JOB_COMPLETED: "Job completed successfully";
    readonly JOB_RETRIED: "Job retried successfully";
    readonly JOB_CLEANED: "Job cleaned successfully";
    readonly QUEUE_CREATED: "Queue created successfully";
    readonly QUEUE_DELETED: "Queue deleted successfully";
    readonly QUEUE_PAUSED: "Queue paused successfully";
    readonly QUEUE_RESUMED: "Queue resumed successfully";
    readonly DLQ_MOVED: "Job moved to DLQ successfully";
    readonly DLQ_PROCESSED: "DLQ message processed successfully";
    readonly WORKER_STARTED: "Worker started successfully";
    readonly WORKER_STOPPED: "Worker stopped successfully";
};
export type QueueSuccessMessage = (typeof QUEUE_SUCCESS_MESSAGES)[keyof typeof QUEUE_SUCCESS_MESSAGES];
/**
 * Helper function to get queue config
 */
export declare const getQueueConfig: (queueName: QueueName) => QueueConfigItem;
/**
 * Helper function to get DLQ queue name
 */
export declare const getDLQQueueName: (queueName: QueueName) => string;
/**
 * Helper function to check if queue has DLQ enabled
 */
export declare const isDLQEnabled: (_queueName: QueueName) => boolean;
/**
 * Helper function to get routing key
 */
export declare const getRoutingKey: (category: keyof typeof ROUTING_KEYS, key: keyof (typeof ROUTING_KEYS)[typeof category]) => string;
/**
 * Helper function to build exchange name
 */
export declare const buildExchangeName: (name: string) => string;
/**
 * Helper function to build queue name
 */
export declare const buildQueueName: (name: string) => string;
/**
 * All queue constants for export
 */
export declare const QUEUE_CONSTANTS: {
    readonly NAMES: {
        /**
         * Email queue for sending emails
         */
        readonly EMAIL: "email";
        /**
         * SMS queue for sending SMS messages
         */
        readonly SMS: "sms";
        /**
         * Webhook queue for processing webhooks
         */
        readonly WEBHOOK: "webhook";
        /**
         * Payment processing queue
         */
        readonly PAYMENT: "payment";
        /**
         * bKash payment queue (Bangladesh)
         */
        readonly BKASH: "bkash";
        /**
         * Nagad payment queue (Bangladesh)
         */
        readonly NAGAD: "nagad";
        /**
         * Rocket payment queue (Bangladesh)
         */
        readonly ROCKET: "rocket";
        /**
         * SSL Commerz payment queue (Bangladesh)
         */
        readonly SSL_COMMERZ: "ssl-commerz";
        /**
         * Courier service queue
         */
        readonly COURIER: "courier";
        /**
         * Courier service queue for Bangladesh
         */
        readonly COURIER_BD: "courier-bd";
        /**
         * Notification queue for push notifications
         */
        readonly NOTIFICATION: "notification";
        /**
         * Analytics queue for processing analytics
         */
        readonly ANALYTICS: "analytics";
        /**
         * Report generation queue
         */
        readonly REPORT: "report";
        /**
         * File processing queue
         */
        readonly FILE_PROCESSING: "file-processing";
        /**
         * Image processing queue
         */
        readonly IMAGE_PROCESSING: "image-processing";
        /**
         * Video processing queue
         */
        readonly VIDEO_PROCESSING: "video-processing";
        /**
         * Data import queue
         */
        readonly DATA_IMPORT: "data-import";
        /**
         * Data export queue
         */
        readonly DATA_EXPORT: "data-export";
        /**
         * Backup queue
         */
        readonly BACKUP: "backup";
        /**
         * Sync queue for data synchronization
         */
        readonly SYNC: "sync";
        /**
         * Audit log queue
         */
        readonly AUDIT_LOG: "audit-log";
        /**
         * Dead Letter Queue for failed jobs
         */
        readonly DEAD_LETTER: "dead-letter";
        /**
         * Default queue
         */
        readonly DEFAULT: "default";
    };
    readonly EXCHANGES: {
        /**
         * Email exchange
         */
        readonly EMAIL: "exchange.email";
        /**
         * SMS exchange
         */
        readonly SMS: "exchange.sms";
        /**
         * Payment exchange
         */
        readonly PAYMENT: "exchange.payment";
        /**
         * Notification exchange
         */
        readonly NOTIFICATION: "exchange.notification";
        /**
         * Webhook exchange
         */
        readonly WEBHOOK: "exchange.webhook";
        /**
         * Analytics exchange
         */
        readonly ANALYTICS: "exchange.analytics";
        /**
         * File exchange
         */
        readonly FILE: "exchange.file";
        /**
         * Default exchange
         */
        readonly DEFAULT: "exchange.default";
        /**
         * Dead Letter exchange
         */
        readonly DEAD_LETTER: "exchange.dead-letter";
        /**
         * Direct exchange for routing
         */
        readonly DIRECT: "exchange.direct";
        /**
         * Topic exchange for pattern routing
         */
        readonly TOPIC: "exchange.topic";
        /**
         * Fanout exchange for broadcasting
         */
        readonly FANOUT: "exchange.fanout";
    };
    readonly ROUTING_KEYS: {
        /**
         * Email routing keys
         */
        readonly EMAIL: {
            readonly WELCOME: "email.welcome";
            readonly VERIFICATION: "email.verification";
            readonly PASSWORD_RESET: "email.password-reset";
            readonly ORDER_CONFIRMATION: "email.order-confirmation";
            readonly PAYMENT_RECEIPT: "email.payment-receipt";
            readonly SHIPPING_UPDATE: "email.shipping-update";
            readonly NEWSLETTER: "email.newsletter";
            readonly PROMOTIONAL: "email.promotional";
            readonly SYSTEM: "email.system";
            readonly ADMIN: "email.admin";
        };
        /**
         * SMS routing keys
         */
        readonly SMS: {
            readonly OTP: "sms.otp";
            readonly VERIFICATION: "sms.verification";
            readonly NOTIFICATION: "sms.notification";
            readonly PROMOTIONAL: "sms.promotional";
            readonly ALERT: "sms.alert";
            readonly ORDER_UPDATE: "sms.order-update";
            readonly PAYMENT_CONFIRMATION: "sms.payment-confirmation";
            readonly DELIVERY_UPDATE: "sms.delivery-update";
        };
        /**
         * Payment routing keys
         */
        readonly PAYMENT: {
            readonly PROCESS: "payment.process";
            readonly VERIFY: "payment.verify";
            readonly REFUND: "payment.refund";
            readonly REVERSE: "payment.reverse";
            readonly CALLBACK: "payment.callback";
            readonly WEBHOOK: "payment.webhook";
            readonly SETTLEMENT: "payment.settlement";
            readonly RECONCILIATION: "payment.reconciliation";
            readonly FAILED: "payment.failed";
        };
        /**
         * Bangladesh payment gateway routing keys
         */
        readonly BD_PAYMENT: {
            readonly BKASH: {
                readonly PROCESS: "payment.bkash.process";
                readonly VERIFY: "payment.bkash.verify";
                readonly REFUND: "payment.bkash.refund";
                readonly CALLBACK: "payment.bkash.callback";
                readonly WEBHOOK: "payment.bkash.webhook";
            };
            readonly NAGAD: {
                readonly PROCESS: "payment.nagad.process";
                readonly VERIFY: "payment.nagad.verify";
                readonly REFUND: "payment.nagad.refund";
                readonly CALLBACK: "payment.nagad.callback";
                readonly WEBHOOK: "payment.nagad.webhook";
            };
            readonly ROCKET: {
                readonly PROCESS: "payment.rocket.process";
                readonly VERIFY: "payment.rocket.verify";
                readonly REFUND: "payment.rocket.refund";
                readonly CALLBACK: "payment.rocket.callback";
                readonly WEBHOOK: "payment.rocket.webhook";
            };
            readonly SSL_COMMERZ: {
                readonly PROCESS: "payment.ssl-commerz.process";
                readonly VERIFY: "payment.ssl-commerz.verify";
                readonly REFUND: "payment.ssl-commerz.refund";
                readonly CALLBACK: "payment.ssl-commerz.callback";
                readonly WEBHOOK: "payment.ssl-commerz.webhook";
            };
        };
        /**
         * Webhook routing keys
         */
        readonly WEBHOOK: {
            readonly PROCESS: "webhook.process";
            readonly RETRY: "webhook.retry";
            readonly FAILED: "webhook.failed";
            readonly VERIFY: "webhook.verify";
        };
        /**
         * Courier routing keys
         */
        readonly COURIER: {
            readonly CREATE_ORDER: "courier.create-order";
            readonly TRACK_ORDER: "courier.track-order";
            readonly UPDATE_STATUS: "courier.update-status";
            readonly CANCEL_ORDER: "courier.cancel-order";
            readonly DELIVERY_CONFIRM: "courier.delivery-confirm";
            readonly PICKUP_REQUEST: "courier.pickup-request";
        };
        /**
         * Bangladesh courier routing keys
         */
        readonly COURIER_BD: {
            readonly SAHAAJ: {
                readonly CREATE: "courier.sahaaj.create";
                readonly TRACK: "courier.sahaaj.track";
                readonly UPDATE: "courier.sahaaj.update";
                readonly CANCEL: "courier.sahaaj.cancel";
            };
            readonly PAPERFLY: {
                readonly CREATE: "courier.paperfly.create";
                readonly TRACK: "courier.paperfly.track";
                readonly UPDATE: "courier.paperfly.update";
                readonly CANCEL: "courier.paperfly.cancel";
            };
            readonly REDX: {
                readonly CREATE: "courier.redx.create";
                readonly TRACK: "courier.redx.track";
                readonly UPDATE: "courier.redx.update";
                readonly CANCEL: "courier.redx.cancel";
            };
        };
        /**
         * Notification routing keys
         */
        readonly NOTIFICATION: {
            readonly PUSH: "notification.push";
            readonly EMAIL: "notification.email";
            readonly SMS: "notification.sms";
            readonly IN_APP: "notification.in-app";
            readonly BROADCAST: "notification.broadcast";
        };
        /**
         * Analytics routing keys
         */
        readonly ANALYTICS: {
            readonly TRACK: "analytics.track";
            readonly AGGREGATE: "analytics.aggregate";
            readonly PROCESS: "analytics.process";
            readonly REPORT: "analytics.report";
        };
        /**
         * System routing keys
         */
        readonly SYSTEM: {
            readonly LOG: "system.log";
            readonly AUDIT: "system.audit";
            readonly ALERT: "system.alert";
            readonly MONITOR: "system.monitor";
            readonly BACKUP: "system.backup";
            readonly SYNC: "system.sync";
        };
        /**
         * File processing routing keys
         */
        readonly FILE: {
            readonly UPLOAD: "file.upload";
            readonly PROCESS: "file.process";
            readonly CONVERT: "file.convert";
            readonly COMPRESS: "file.compress";
            readonly DELETE: "file.delete";
        };
        /**
         * Dead Letter routing keys
         */
        readonly DEAD_LETTER: {
            readonly ALL: "dead-letter.all";
            readonly EMAIL: "dead-letter.email";
            readonly SMS: "dead-letter.sms";
            readonly PAYMENT: "dead-letter.payment";
            readonly WEBHOOK: "dead-letter.webhook";
        };
    };
    readonly CONFIG: Record<QueueName, QueueConfigItem>;
    readonly DLQ: {
        /**
         * Enable DLQ for all queues
         */
        readonly ENABLED: true;
        /**
         * DLQ prefix for queue names
         */
        readonly PREFIX: "dlq:";
        /**
         * Maximum retry attempts before sending to DLQ
         */
        readonly MAX_RETRY_ATTEMPTS: 5;
        /**
         * DLQ processing delay in seconds
         */
        readonly PROCESSING_DELAY: 60;
        /**
         * DLQ message TTL in seconds
         */
        readonly MESSAGE_TTL: 604800;
        /**
         * DLQ queue names
         */
        readonly QUEUES: {
            readonly EMAIL: "dlq:email";
            readonly SMS: "dlq:sms";
            readonly PAYMENT: "dlq:payment";
            readonly WEBHOOK: "dlq:webhook";
            readonly BKASH: "dlq:bkash";
            readonly NAGAD: "dlq:nagad";
            readonly ROCKET: "dlq:rocket";
            readonly SSL_COMMERZ: "dlq:ssl-commerz";
            readonly COURIER: "dlq:courier";
            readonly NOTIFICATION: "dlq:notification";
            readonly ANALYTICS: "dlq:analytics";
            readonly FILE_PROCESSING: "dlq:file-processing";
            readonly DEFAULT: "dlq:default";
        };
    };
    readonly PRIORITY: {
        /**
         * Critical priority - Highest priority
         */
        readonly CRITICAL: 1;
        /**
         * High priority
         */
        readonly HIGH: 2;
        /**
         * Medium priority
         */
        readonly MEDIUM: 3;
        /**
         * Low priority
         */
        readonly LOW: 4;
        /**
         * Background priority - Lowest priority
         */
        readonly BACKGROUND: 5;
    };
    readonly EVENTS: {
        /**
         * Job lifecycle events
         */
        readonly JOB_ADDED: "job.added";
        readonly JOB_STARTED: "job.started";
        readonly JOB_COMPLETED: "job.completed";
        readonly JOB_FAILED: "job.failed";
        readonly JOB_RETRY: "job.retry";
        readonly JOB_DELAYED: "job.delayed";
        readonly JOB_STALLED: "job.stalled";
        readonly JOB_PROGRESS: "job.progress";
        readonly JOB_REMOVED: "job.removed";
        readonly JOB_CLEANED: "job.cleaned";
        /**
         * Queue lifecycle events
         */
        readonly QUEUE_PAUSED: "queue.paused";
        readonly QUEUE_RESUMED: "queue.resumed";
        readonly QUEUE_DRAINED: "queue.drained";
        readonly QUEUE_ERROR: "queue.error";
        /**
         * DLQ events
         */
        readonly DLQ_MOVED: "dlq.moved";
        readonly DLQ_PROCESSED: "dlq.processed";
        readonly DLQ_FAILED: "dlq.failed";
        /**
         * Worker events
         */
        readonly WORKER_STARTED: "worker.started";
        readonly WORKER_STOPPED: "worker.stopped";
        readonly WORKER_ERROR: "worker.error";
    };
    readonly ERROR_MESSAGES: {
        readonly QUEUE_NOT_FOUND: "Queue not found";
        readonly JOB_NOT_FOUND: "Job not found";
        readonly JOB_FAILED: "Job execution failed";
        readonly JOB_TIMEOUT: "Job execution timeout";
        readonly JOB_STALLED: "Job stalled";
        readonly QUEUE_PAUSED: "Queue is paused";
        readonly QUEUE_FULL: "Queue is full";
        readonly CONNECTION_FAILED: "Queue connection failed";
        readonly PUBLISH_FAILED: "Failed to publish message to queue";
        readonly CONSUME_FAILED: "Failed to consume message from queue";
        readonly ACK_FAILED: "Failed to acknowledge message";
        readonly RETRY_EXCEEDED: "Maximum retry attempts exceeded";
        readonly DLQ_MOVE_FAILED: "Failed to move job to DLQ";
        readonly DLQ_PROCESS_FAILED: "Failed to process DLQ message";
        readonly SERIALIZATION_FAILED: "Failed to serialize job data";
        readonly DESERIALIZATION_FAILED: "Failed to deserialize job data";
        readonly INVALID_JOB_DATA: "Invalid job data";
        readonly JOB_CANCELLED: "Job cancelled by user";
        readonly WORKER_ERROR: "Worker encountered an error";
    };
    readonly SUCCESS_MESSAGES: {
        readonly JOB_ADDED: "Job added to queue successfully";
        readonly JOB_COMPLETED: "Job completed successfully";
        readonly JOB_RETRIED: "Job retried successfully";
        readonly JOB_CLEANED: "Job cleaned successfully";
        readonly QUEUE_CREATED: "Queue created successfully";
        readonly QUEUE_DELETED: "Queue deleted successfully";
        readonly QUEUE_PAUSED: "Queue paused successfully";
        readonly QUEUE_RESUMED: "Queue resumed successfully";
        readonly DLQ_MOVED: "Job moved to DLQ successfully";
        readonly DLQ_PROCESSED: "DLQ message processed successfully";
        readonly WORKER_STARTED: "Worker started successfully";
        readonly WORKER_STOPPED: "Worker stopped successfully";
    };
};
/**
 * All queue constants for export
 */
export declare const ALL_QUEUE_CONSTANTS: {
    readonly JOB_ADDED: "Job added to queue successfully";
    readonly JOB_COMPLETED: "Job completed successfully";
    readonly JOB_RETRIED: "Job retried successfully";
    readonly JOB_CLEANED: "Job cleaned successfully";
    readonly QUEUE_CREATED: "Queue created successfully";
    readonly QUEUE_DELETED: "Queue deleted successfully";
    readonly QUEUE_PAUSED: "Queue paused successfully";
    readonly QUEUE_RESUMED: "Queue resumed successfully";
    readonly DLQ_MOVED: "Job moved to DLQ successfully";
    readonly DLQ_PROCESSED: "DLQ message processed successfully";
    readonly WORKER_STARTED: "Worker started successfully";
    readonly WORKER_STOPPED: "Worker stopped successfully";
    readonly QUEUE_NOT_FOUND: "Queue not found";
    readonly JOB_NOT_FOUND: "Job not found";
    readonly JOB_FAILED: "Job execution failed";
    readonly JOB_TIMEOUT: "Job execution timeout";
    readonly JOB_STALLED: "Job stalled";
    readonly QUEUE_FULL: "Queue is full";
    readonly CONNECTION_FAILED: "Queue connection failed";
    readonly PUBLISH_FAILED: "Failed to publish message to queue";
    readonly CONSUME_FAILED: "Failed to consume message from queue";
    readonly ACK_FAILED: "Failed to acknowledge message";
    readonly RETRY_EXCEEDED: "Maximum retry attempts exceeded";
    readonly DLQ_MOVE_FAILED: "Failed to move job to DLQ";
    readonly DLQ_PROCESS_FAILED: "Failed to process DLQ message";
    readonly SERIALIZATION_FAILED: "Failed to serialize job data";
    readonly DESERIALIZATION_FAILED: "Failed to deserialize job data";
    readonly INVALID_JOB_DATA: "Invalid job data";
    readonly JOB_CANCELLED: "Job cancelled by user";
    readonly WORKER_ERROR: "Worker encountered an error";
    readonly JOB_STARTED: "job.started";
    readonly JOB_RETRY: "job.retry";
    readonly JOB_DELAYED: "job.delayed";
    readonly JOB_PROGRESS: "job.progress";
    readonly JOB_REMOVED: "job.removed";
    readonly QUEUE_DRAINED: "queue.drained";
    readonly QUEUE_ERROR: "queue.error";
    readonly DLQ_FAILED: "dlq.failed";
    /**
     * Critical priority - Highest priority
     */
    readonly CRITICAL: 1;
    /**
     * High priority
     */
    readonly HIGH: 2;
    /**
     * Medium priority
     */
    readonly MEDIUM: 3;
    /**
     * Low priority
     */
    readonly LOW: 4;
    /**
     * Background priority - Lowest priority
     */
    readonly BACKGROUND: 5;
    /**
     * Enable DLQ for all queues
     */
    readonly ENABLED: true;
    /**
     * DLQ prefix for queue names
     */
    readonly PREFIX: "dlq:";
    /**
     * Maximum retry attempts before sending to DLQ
     */
    readonly MAX_RETRY_ATTEMPTS: 5;
    /**
     * DLQ processing delay in seconds
     */
    readonly PROCESSING_DELAY: 60;
    /**
     * DLQ message TTL in seconds
     */
    readonly MESSAGE_TTL: 604800;
    /**
     * DLQ queue names
     */
    readonly QUEUES: {
        readonly EMAIL: "dlq:email";
        readonly SMS: "dlq:sms";
        readonly PAYMENT: "dlq:payment";
        readonly WEBHOOK: "dlq:webhook";
        readonly BKASH: "dlq:bkash";
        readonly NAGAD: "dlq:nagad";
        readonly ROCKET: "dlq:rocket";
        readonly SSL_COMMERZ: "dlq:ssl-commerz";
        readonly COURIER: "dlq:courier";
        readonly NOTIFICATION: "dlq:notification";
        readonly ANALYTICS: "dlq:analytics";
        readonly FILE_PROCESSING: "dlq:file-processing";
        readonly DEFAULT: "dlq:default";
    };
    readonly payment: QueueConfigItem;
    readonly analytics: QueueConfigItem;
    readonly notification: QueueConfigItem;
    readonly sms: QueueConfigItem;
    readonly email: QueueConfigItem;
    readonly backup: QueueConfigItem;
    readonly webhook: QueueConfigItem;
    readonly bkash: QueueConfigItem;
    readonly nagad: QueueConfigItem;
    readonly rocket: QueueConfigItem;
    readonly "ssl-commerz": QueueConfigItem;
    readonly courier: QueueConfigItem;
    readonly "courier-bd": QueueConfigItem;
    readonly report: QueueConfigItem;
    readonly "file-processing": QueueConfigItem;
    readonly "image-processing": QueueConfigItem;
    readonly "video-processing": QueueConfigItem;
    readonly "data-import": QueueConfigItem;
    readonly "data-export": QueueConfigItem;
    readonly sync: QueueConfigItem;
    readonly "audit-log": QueueConfigItem;
    readonly "dead-letter": QueueConfigItem;
    readonly default: QueueConfigItem;
    /**
     * Email routing keys
     */
    readonly EMAIL: {
        readonly WELCOME: "email.welcome";
        readonly VERIFICATION: "email.verification";
        readonly PASSWORD_RESET: "email.password-reset";
        readonly ORDER_CONFIRMATION: "email.order-confirmation";
        readonly PAYMENT_RECEIPT: "email.payment-receipt";
        readonly SHIPPING_UPDATE: "email.shipping-update";
        readonly NEWSLETTER: "email.newsletter";
        readonly PROMOTIONAL: "email.promotional";
        readonly SYSTEM: "email.system";
        readonly ADMIN: "email.admin";
    };
    /**
     * SMS routing keys
     */
    readonly SMS: {
        readonly OTP: "sms.otp";
        readonly VERIFICATION: "sms.verification";
        readonly NOTIFICATION: "sms.notification";
        readonly PROMOTIONAL: "sms.promotional";
        readonly ALERT: "sms.alert";
        readonly ORDER_UPDATE: "sms.order-update";
        readonly PAYMENT_CONFIRMATION: "sms.payment-confirmation";
        readonly DELIVERY_UPDATE: "sms.delivery-update";
    };
    /**
     * Payment routing keys
     */
    readonly PAYMENT: {
        readonly PROCESS: "payment.process";
        readonly VERIFY: "payment.verify";
        readonly REFUND: "payment.refund";
        readonly REVERSE: "payment.reverse";
        readonly CALLBACK: "payment.callback";
        readonly WEBHOOK: "payment.webhook";
        readonly SETTLEMENT: "payment.settlement";
        readonly RECONCILIATION: "payment.reconciliation";
        readonly FAILED: "payment.failed";
    };
    /**
     * Bangladesh payment gateway routing keys
     */
    readonly BD_PAYMENT: {
        readonly BKASH: {
            readonly PROCESS: "payment.bkash.process";
            readonly VERIFY: "payment.bkash.verify";
            readonly REFUND: "payment.bkash.refund";
            readonly CALLBACK: "payment.bkash.callback";
            readonly WEBHOOK: "payment.bkash.webhook";
        };
        readonly NAGAD: {
            readonly PROCESS: "payment.nagad.process";
            readonly VERIFY: "payment.nagad.verify";
            readonly REFUND: "payment.nagad.refund";
            readonly CALLBACK: "payment.nagad.callback";
            readonly WEBHOOK: "payment.nagad.webhook";
        };
        readonly ROCKET: {
            readonly PROCESS: "payment.rocket.process";
            readonly VERIFY: "payment.rocket.verify";
            readonly REFUND: "payment.rocket.refund";
            readonly CALLBACK: "payment.rocket.callback";
            readonly WEBHOOK: "payment.rocket.webhook";
        };
        readonly SSL_COMMERZ: {
            readonly PROCESS: "payment.ssl-commerz.process";
            readonly VERIFY: "payment.ssl-commerz.verify";
            readonly REFUND: "payment.ssl-commerz.refund";
            readonly CALLBACK: "payment.ssl-commerz.callback";
            readonly WEBHOOK: "payment.ssl-commerz.webhook";
        };
    };
    /**
     * Webhook routing keys
     */
    readonly WEBHOOK: {
        readonly PROCESS: "webhook.process";
        readonly RETRY: "webhook.retry";
        readonly FAILED: "webhook.failed";
        readonly VERIFY: "webhook.verify";
    };
    /**
     * Courier routing keys
     */
    readonly COURIER: {
        readonly CREATE_ORDER: "courier.create-order";
        readonly TRACK_ORDER: "courier.track-order";
        readonly UPDATE_STATUS: "courier.update-status";
        readonly CANCEL_ORDER: "courier.cancel-order";
        readonly DELIVERY_CONFIRM: "courier.delivery-confirm";
        readonly PICKUP_REQUEST: "courier.pickup-request";
    };
    /**
     * Bangladesh courier routing keys
     */
    readonly COURIER_BD: {
        readonly SAHAAJ: {
            readonly CREATE: "courier.sahaaj.create";
            readonly TRACK: "courier.sahaaj.track";
            readonly UPDATE: "courier.sahaaj.update";
            readonly CANCEL: "courier.sahaaj.cancel";
        };
        readonly PAPERFLY: {
            readonly CREATE: "courier.paperfly.create";
            readonly TRACK: "courier.paperfly.track";
            readonly UPDATE: "courier.paperfly.update";
            readonly CANCEL: "courier.paperfly.cancel";
        };
        readonly REDX: {
            readonly CREATE: "courier.redx.create";
            readonly TRACK: "courier.redx.track";
            readonly UPDATE: "courier.redx.update";
            readonly CANCEL: "courier.redx.cancel";
        };
    };
    /**
     * Notification routing keys
     */
    readonly NOTIFICATION: {
        readonly PUSH: "notification.push";
        readonly EMAIL: "notification.email";
        readonly SMS: "notification.sms";
        readonly IN_APP: "notification.in-app";
        readonly BROADCAST: "notification.broadcast";
    };
    /**
     * Analytics routing keys
     */
    readonly ANALYTICS: {
        readonly TRACK: "analytics.track";
        readonly AGGREGATE: "analytics.aggregate";
        readonly PROCESS: "analytics.process";
        readonly REPORT: "analytics.report";
    };
    /**
     * System routing keys
     */
    readonly SYSTEM: {
        readonly LOG: "system.log";
        readonly AUDIT: "system.audit";
        readonly ALERT: "system.alert";
        readonly MONITOR: "system.monitor";
        readonly BACKUP: "system.backup";
        readonly SYNC: "system.sync";
    };
    /**
     * File processing routing keys
     */
    readonly FILE: {
        readonly UPLOAD: "file.upload";
        readonly PROCESS: "file.process";
        readonly CONVERT: "file.convert";
        readonly COMPRESS: "file.compress";
        readonly DELETE: "file.delete";
    };
    /**
     * Dead Letter routing keys
     */
    readonly DEAD_LETTER: {
        readonly ALL: "dead-letter.all";
        readonly EMAIL: "dead-letter.email";
        readonly SMS: "dead-letter.sms";
        readonly PAYMENT: "dead-letter.payment";
        readonly WEBHOOK: "dead-letter.webhook";
    };
    /**
     * Default exchange
     */
    readonly DEFAULT: "exchange.default";
    /**
     * Direct exchange for routing
     */
    readonly DIRECT: "exchange.direct";
    /**
     * Topic exchange for pattern routing
     */
    readonly TOPIC: "exchange.topic";
    /**
     * Fanout exchange for broadcasting
     */
    readonly FANOUT: "exchange.fanout";
    /**
     * bKash payment queue (Bangladesh)
     */
    readonly BKASH: "bkash";
    /**
     * Nagad payment queue (Bangladesh)
     */
    readonly NAGAD: "nagad";
    /**
     * Rocket payment queue (Bangladesh)
     */
    readonly ROCKET: "rocket";
    /**
     * SSL Commerz payment queue (Bangladesh)
     */
    readonly SSL_COMMERZ: "ssl-commerz";
    /**
     * Report generation queue
     */
    readonly REPORT: "report";
    /**
     * File processing queue
     */
    readonly FILE_PROCESSING: "file-processing";
    /**
     * Image processing queue
     */
    readonly IMAGE_PROCESSING: "image-processing";
    /**
     * Video processing queue
     */
    readonly VIDEO_PROCESSING: "video-processing";
    /**
     * Data import queue
     */
    readonly DATA_IMPORT: "data-import";
    /**
     * Data export queue
     */
    readonly DATA_EXPORT: "data-export";
    /**
     * Backup queue
     */
    readonly BACKUP: "backup";
    /**
     * Sync queue for data synchronization
     */
    readonly SYNC: "sync";
    /**
     * Audit log queue
     */
    readonly AUDIT_LOG: "audit-log";
};
//# sourceMappingURL=queue.constants.d.ts.map