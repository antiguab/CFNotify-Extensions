require 'pusher'

Pusher.url = "http://19a6c30b18c4c19e98f3:337a099ecf29dd0bc98d@api.pusherapp.com/apps/94226"

id = rand(36**5).to_s(36)

Pusher['admin_channel'].trigger('status_update', {
    :request_id => "10000000000051",
    :content => "Creating VM Provision Request",
    :status => "Creating VM Provision Request",
    :user => "admin",
    :id => rand(36**5).to_s(36)
})

Pusher['admin_channel'].trigger('status_update', {
    :request_id => "10000000000051",
    :content => "Approved Provosion Request 10000000000051",
    :status => "Approved Provosion Request 10000000000051",
    :user => "admin",
    :id => rand(36**5).to_s(36)
})

Pusher['admin_channel'].trigger('status_update', {
    :request_id => "10000000000051",
    :content => "VM Successfully Provisioned",
    :status => "VM Successfully Provisioned",
    :user => "admin",
    :id => rand(36**5).to_s(36)
})