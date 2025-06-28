# PyrusAPI Client

[![npm version](https://badge.fury.io/js/pyrus-api.svg)](https://badge.fury.io/js/pyrus-api)

A TypeScript client for the Pyrus API.
The full documentation for API can be found [here](https://pyrus.com/en/help/api/)

## Getting Started

* Install

```
npm install pyrus-api
```

* Import client

```typescript
import {PyrusApiClient} from "pyrus-api";
```

* Create and authenticate API client      

```typescript
const client = new PyrusApiClient(
  {
      login: "pyrus@login.com",
      security_key: "security_key_from_profile"
  }
);
```
  
## Forms

* Get all form templates
  
```typescript
const formsResponse = await client.forms.getAll();
const forms = formsResponse.forms;
```

* Get tasks list by form template

```typescript
import {OperatorId, toDateString} from "pyrus-api";
```
  
```typescript
const maxDate = new Date("2024-01-12");
const formId = 19963;
const formRegisterResponse = await client.forms.getTasks(
    formId,
    {
        filters: [
            {
                operator_id: OperatorId.Equals,
                field_id: 6,
                values: ['555']
            },
            {
                operator_id: OperatorId.LessThan,
                field_id: 4,
                values: [toDateString(maxDate)]
            }
        ],
        include_archived: "y"
    }
);
const tasks = formRegisterResponse.tasks;
```
      
## Tasks

* Get task with all comments

```typescript
const taskResponse = await client.tasks.get({id: 2512});
const task = taskResponse.task;
```

* Add task comment

```typescript
import type {FormFieldTable} from "pyrus-api";
import {ApprovalChoice} from "pyrus-api";
```

```typescript
const taskId = 2512;
const fieldToAdd: FormFieldTable = {
    type: FormFieldType.Table,
    value: [
        {
            row_id: 15,
            cells: [
                {
                    type: FormFieldType.Text,
                    name: "Comment",
                    value: "That's right"
                }
            ]
        }
    ]
};
const taskResponse = await client.tasks.addComment(
    taskId,
    {
        approval_choice: ApprovalChoice.Approved,
        field_updates: [fieldToAdd]
    }
);
const task = taskResponse.task;
```

* Create a task
  
```typescript
const taskResponse = await client.tasks.create(
    {
        text: "Help me",
        participants: [
            {id: 1731},
            {email: "Amanda.Smith@gmail.com"}
        ],
        due_date: new Date("2024-11-03")
    }
);
const task = taskResponse.task;
```

## Files

* Upload a file

```typescript
const file = await fs.openAsBlob("C:\\path\\to\\file");
const fileResponse = await client.files.upload(file, "filename");
const fileId = fileResponse.guid;
```

## Catalogs

* Get catalog with all items

```typescript
const catalogResponse = await client.catalogs.get({id: 1525});
const items = catalogResponse.items;
```

* Create catalog

```typescript
const catalogResponse = await client.catalogs.create(
    {
        name: "NewCatalog",
        catalog_headers: ["Header1", "Header2"],
        items: [
            {values: ["A1", "A2"]},
            {values: ["B1", "B2"]}
        ]
    }
);
const catalogId = catalogResponse.catalog_id;
```

* Sync catalog (All unspecified catalog items and text columns will be deleted)

```typescript
const catalogResponse = await client.catalogs.sync(
    {
        id: 1236,
        apply: true,

        catalog_headers: ["Header1", "Header3"],
        items: [
            {values: ["A1", "A3"]},
            {values: ["C1", "C2"]}
        ]
    }
);
```

## Contacts

* Get all available contacts

```typescript
const contactsResponse = await client.contacts.getAll();
```

## Lists

* Get all lists

```typescript
const listsResponse = await client.lists.getAll();
```

* Get all tasks in list

```typescript
const listId = 1322;
const listsResponse = await client.lists.getTasksInList(listId);
```

## Roles

* Get all organization roles

```typescript
const rolesResponse = await client.role.getAll();
```

* Create role

```typescript
const roleResponse = await client.role.create(
    {
        name: "TechSupport",
        member_add: [1732, 4368]
    }
);
```

* Update role

```typescript
const roleResponse = await client.role.update(
    {
        id: 6476,
        member_add: [2434],
        member_remove: [1732, 4368],
        external_id: "CustomIdentifier"
    }
);
```

## Profile

* Get profile

```typescript
const profileResponse = await client.profile.get();
```


## Inbox

* Get inbox

```typescript
const inboxResponse = await client.lists.getInbox({item_count: 10});
```

## Announcements

* Get announcement with all comments

```typescript
const announcementResponse = await client.announcements.get({id: 15353});
const announcement = announcementResponse.announcement;
```

* Get announcements with all comments

```typescript
const announcementsResponse = await client.announcements.getAll();
const announcements = announcementsResponse.announcements;
```

* Add announcement comment

```typescript
const announcementId = 15353;
const announcementResponse = await client.announcements.addComment(
    announcementId,
    {
        text: "SomeText"
    }
);
```

* Create an announcement
  
```typescript
const announcementResponse = await client.announcements.create(
    {
        text: "New announcement"
    }
);
```