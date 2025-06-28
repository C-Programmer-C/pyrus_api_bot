import { extractEmailsFromTask } from "../taskUtils.js";
import { extractDomenFromEmail } from "./extractDomenFromEmail.js";
import {OperatorId} from 'pyrus-api';


export async function findContractorByEmail(api, task) {
    const FORM_ID_Contractor = 2306222;
    const DOMEN_FIELD_ID = 14;
    const email_value = extractEmailsFromTask(task)[0];
    const domen = extractDomenFromEmail(email_value);
     const result = await api.forms.getTasks(FORM_ID_Contractor, {
        filters: [
            {
                operator_id: OperatorId.Equals,
                field_id: DOMEN_FIELD_ID,
                values: [String(domen)]
            },
        ],
    });

    

    return result;

}
