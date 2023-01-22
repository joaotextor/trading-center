export default function formatCurrency(value, country) {
    switch (country) {
        case 'CA': return value.toLocaleString('en-CA', {style: 'currency', currency: 'CAD'})

        case 'US': return value.toLocaleString('US', {style: 'currency', currency: 'USD'})

        case 'BR': return value.toLocaleString('BR', {style: 'currency', currency: 'BRL'})    
    }   
}