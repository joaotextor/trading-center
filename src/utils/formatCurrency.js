export default function formatCurrency(value, countryCode) {
    switch (countryCode) {
        case 'CA': return 'C'+value.toLocaleString('en-CA', {style: 'currency', currency: 'CAD'});

        case 'US': return value.toLocaleString('US', {style: 'currency', currency: 'USD'})

        case 'BR': return value.toLocaleString('BR', {style: 'currency', currency: 'BRL'})    
    }   
}