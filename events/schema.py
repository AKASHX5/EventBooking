import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q

from .models import Event,Booking
from user.schema import UserType


class EventType(DjangoObjectType):
    class Meta:
        model = Event


class BookingType(DjangoObjectType):
    class Meta:
        model = Booking


class Query(graphene.ObjectType):
    events = graphene.List(EventType)
    booking = graphene.List(BookingType)

    # def resolve_events(self, info, search=None):
    #     if search:
    #         filter = (
    #             Q(name__icontains=search)|
    #             Q(created_by__username__icontains=search)
    #
    #
    #         )
    #
    #
    #
    #     return Event.objects.filter(filter)

    def resolve_events(self,info):
        return Event.objects.all()

    def resolve_booking(self,info,**kwargs):
        return Booking.objects.all()


class CreateEvent(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    time = graphene.DateTime()
    booking_status = graphene.Boolean()

    class Arguments:
        name = graphene.String()
        time = graphene.DateTime()
        booking_status = graphene.Boolean()

    def mutate(self,info,name,time,booking_status ):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("Log in to add track")
        event = Event(name=name,time=time,created_by=user,booking_status=booking_status)
        event.save()

        return CreateEvent(
            id=event.id,
            name=event.name,
            time=time,
            booking_status=booking_status
        )


class CreateBooking(graphene.Mutation):
    subscriber = graphene.Field(UserType)
    event = graphene.Field(EventType)

    class Arguments:
        event_id = graphene.Int(required=True)

    def mutate(self, info,event_id):
        subscriber = info.context.user
        print(subscriber)

        if subscriber.is_anonymous:
            raise Exception("Log in to book")
        event = Event.objects.get(id=event_id)
        print(event)

        if not event:
            raise Exception("Cannot find the following schedule")



        Booking.objects.create(
            booked_by=subscriber,
            event=event
        )

        return CreateBooking(subscriber=subscriber, event=event)


class UpdateEvent(graphene.Mutation):
    event = graphene.Field(EventType)

    class Arguments:
        event_id = graphene.Int(required=True)
        name = graphene.String()
        time = graphene.DateTime()
        booking_status = graphene.Boolean()

    def mutate(self,info, event_id, name, time,booking_status):
        user = info.context.user
        event = Event.objects.get(id=event_id)

        if event.created_by != user:
            raise Exception("Not permitted to log in")

        event.name = name
        event.time = time
        event.booking_status = booking_status

        event.save()
        return UpdateEvent(event=event)


class DeleteEvent(graphene.Mutation):
    event_id = graphene.Int()

    class Arguments:
        event_id = graphene.Int(required=True)

    def mutate(self, info, event_id):
        user = info.context.user
        event = Event.objects.get(id= event_id)

        if event.created_by != user:
            raise Exception("Not permitted to delete")
        event.delete()

        return DeleteEvent(event_id=event_id)


class Mutation(graphene.ObjectType):
    create_event = CreateEvent.Field()
    update_event = UpdateEvent.Field()
    delete_event = DeleteEvent.Field()
    create_booking = CreateBooking.Field()
