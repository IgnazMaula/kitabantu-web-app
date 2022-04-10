export function checkSteps(status) {
    let steps;
    if (status === 'Waiting for Provider Approval') {
        steps = [
            {
                id: '01',
                name: 'Waiting for Approval',
                description: 'Service order created, Order requested to provider.',
                href: '#',
                status: 'current',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'upcoming',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'upcoming',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    } else if (status === 'Waiting for Payment') {
        steps = [
            {
                id: '01',
                name: 'Waiting for Approval',
                description: 'Service order created, Order requested to provider.',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'current',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'upcoming',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    } else if (status === 'Service Incoming') {
        steps = [
            {
                id: '01',
                name: 'Waiting for Approval',
                description: 'Service order created, Order requested to provider.',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'complete',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'current',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    } else if (status === 'Complete Approval') {
        steps = [
            {
                id: '01',
                name: 'Waiting for Approval',
                description: 'Service order created, Order requested to provider.',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'complete',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'current',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    } else if (status === 'Order Completed') {
        steps = [
            {
                id: '01',
                name: 'Waiting for Approval',
                description: 'Service order created, Order requested to provider.',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'complete',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'complete',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'complete' },
        ];
    } else if (status === 'Order Canceled') {
        steps = [
            {
                id: '01',
                name: 'Order Canceled',
                description: 'Client decided to canceled this order',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'upcoming',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'upcoming',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    } else if (status === 'Order Declined') {
        steps = [
            {
                id: '01',
                name: 'Order Declined',
                description: 'Provider decided to declined this order',
                href: '#',
                status: 'complete',
            },
            {
                id: '02',
                name: 'Waiting for Payment',
                description: 'Order accepted by Provider. Client proceed to do the payment.',
                href: '#',
                status: 'upcoming',
            },
            {
                id: '03',
                name: 'Service Incoming',
                description: 'Payment done, Provider will go to your house on the given schedule.',
                href: '#',
                status: 'upcoming',
            },
            { id: '04', name: 'Order Completed', description: 'Service has been provided.', href: '#', status: 'upcoming' },
        ];
    }

    return steps;
}
